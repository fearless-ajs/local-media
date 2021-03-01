<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Media;
use App\Models\Comment;
use App\Models\MediaView;


class MediaController extends BaseController
{

    /**
     * get all media
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function getAllMedia(Request $request)
    {
        return $this->sendResponse(Media::orderByDesc('id')->get());
    }


    /**
     * get media info
     * @param  Request $request
     * @param  [type]  $id      media id
     * @return [type]
     */
    public function getMedia(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if ($id == '-1') {
            $media = Media::orderByDesc('id')->first();
        }
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }
        return $this->sendResponse($media);
    }

    /**
     * get media comments
     * @param  Request $request
     * @param  [type]  $id      media id
     * @return [type]
     */
    public function getMediaComments(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }

        return $this->sendResponse(Comment::where('media_id', $media->id)->get());
    }


    //////////////////////////////
    // User interaction methods //
    //////////////////////////////

    /**
     * increment media like count
     * @param  [type]  $id      [description]
     */
    public function like(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }
        $media->likes += 1;
        $media->save();
        return $this->sendResponse(true);
    }

    /**
     * add a new comment on media
     * @param  [type]  $id      [description]
     */
    public function comment(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required | string | max:255',
            'comment' => 'required | string',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Input Validation Failed', $validator->errors()->all(), 422);
        }

        Comment::create([
            'name' => $request->name,
            'message' => $request->comment,
            'media_id' => $media->id,
        ]);

        $media->comments += 1;
        $media->save();
        return $this->sendResponse(true, "Comment added successfully");
    }

    /**
     * increment media view count
     * also increment count in media_view table which ties a media views with a particular user
     * @param  [type]  $id      [description]
     */
    public function view(Request $request, $media_id, $user_id)
    {
        $media = Media::firstWhere('id', $media_id);
        $user = User::firstWhere('id', $user_id);
        if (!$media || !$user) {
            return $this->sendError('Invalid link', [], 403);
        }

        // $media_view = MediaView::where('user_id', $user_id)->where('media_id', $media_id)->first();
        // if (!$media_view) {
        //     $media_view = MediaView::create([
        //         'user_id' => $user_id,
        //         'media_id' => $media_id,
        //     ]);
        // }
        // $media_view->count += 1;
        // $media_view->save();


        // create a new media_view row on every view
        // this will aid in recording view times when doing analytics
        $media_view = MediaView::create([
            'user_id' => $user_id,
            'media_id' => $media_id,
            'count' => 1,
        ]);


        $media->views += 1;
        $media->save();

        return $this->sendResponse(true);
    }

    /**
     * increment share share count
     * @param  [type]  $id      [description]
     */
    public function share(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }

        $media->shares += 1;
        $media->save();
        return $this->sendResponse(true);
    }


    ////////////////////////////
    // User behaviour methods //
    ////////////////////////////

    /**
     * increment media open count
     */
    public function media_open(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }
        $media->user_open += 1;
        $media->save();
        return $this->sendResponse(true);
    }

    /**
     * increment media bounce count
     */
    public function media_bounce(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }
        $media->user_bounce += 1;
        $media->save();
        return $this->sendResponse(true);
    }

    /**
     * increment media engage count
     */
    public function media_engage(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }
        $media->user_engage += 1;
        $media->save();
        return $this->sendResponse(true);
    }


    /**
     * Uploads a media.
     *
     * @param      \Illuminate\Http\Request  $request  The request
     */
    public function uploadMedia(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'name' => 'required | string',
            'media_file' => 'required | mimes:mp4,webm,3gp,pdf',
        ]);
        if ($validator->fails()) {
            $err_msg = $request->name
                ? 'Uploaded media must be either a video or pdf file'
                : 'Missing required field';
            return $this->sendError($err_msg, $validator->errors()->all(), 422);
        }

        $path = "[file missing]";
        $ftype = "video";

        if ($request->hasFile('media_file')) {
            if ($request->file('media_file')->isValid()) {
                $f_name = Str::random(20);
                $f_extension = $request->media_file->extension();
                $file_name = "$f_name.$f_extension";

                $request->media_file->storeAs('/public', $file_name);

                $path = $file_name;

                if ($f_extension == "pdf") {
                    $ftype = "pdf";
                }
            }
        }

        // add to DB
        Media::create([
            'name' => $request->name,
            'path' => $path,
            'type' => $ftype
        ]);

        return $this->sendResponse(true, "File Uploaded");
    }


    /**
     * delete media
     *
     * @param      \Illuminate\Http\Request  $request  The request
     */
    public function deleteMedia(Request $request, $id)
    {
        $media = Media::firstWhere('id', $id);
        if (!$media) {
            return $this->sendError('Media Not Found', [], 404);
        }

        $media->delete();
        return $this->sendResponse(true);
    }
}
