<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

use App\Models\Media;
use App\Models\MediaView;

class AnalyticsController extends BaseController
{

    /**
     * Gets the total statistics total (likes, shares, views, comments)
     *
     * @param      \Illuminate\Http\Request  $request  The request
     *
     * @return     <type>                    The total statistics.
     */
    public function getTotalStats(Request $request)
    {
        $data = DB::table('media')
            ->select(DB::raw('SUM(likes) as likes, SUM(shares) as shares, SUM(views) as views, SUM(comments) as comments'))
            ->first();

        return $this->sendResponse($data);
    }


    /**
     * Gets the users behaviour for the last media.
     *  open, bounce, engagement
     *
     * @param      \Illuminate\Http\Request  $request  The request
     */
    public function getUsersBehaviour(Request $request)
    {
        $data = Media::orderByDesc('id')
            ->select('user_open', 'user_bounce', 'user_engage')
            ->first();

        return $this->sendResponse($data);
    }


    /**
     * Gets the distributors (from best to worst wrt views).
     *
     * @param      \Illuminate\Http\Request  $request  The request
     */
    public function getDistributors(Request $request, $media_id=-1)
    {
        $data = DB::table('users')
        ->join('media_view', function ($join) use($media_id) {
            $join->on("users.id", '=', 'media_view.user_id');

            //
            if ($media_id != -1) $join->where("media_view.media_id", '=', $media_id);
        })
        ->select(DB::raw('users.id as user_id, users.name, media_view.count as total_views'))
        ->orderByDesc('total_views')
        ->get();


        $result = [];
        foreach ($data as $f) {
            if (!array_key_exists($f->name, $result))
                $result[$f->name] = 0;

            $result[$f->name] += $f->total_views;
        }

        // sort in descending order
        arsort($result);

        // limit to top10 if no we are not fetching
        // for a specific media
        if ($media_id == -1) {
            $result = array_slice($result, 0, 10);
        }

        return $this->sendResponse($result);
    }


    /**
     * Get 'views' metrics of a media
     *
     * @param      \Illuminate\Http\Request  $request   The request
     * @param      <type>                    $media_id  The media identifier
     */
    public function getPerformance(Request $request, $media_id=-1)
    {
        if ($media_id == -1) {
            // if no media id specified fetch for last media
            $media_id = Media::orderByDesc('id')->first()->id;
        }
        if (!Media::firstWhere('id', $media_id)) {
            return $this->sendResponse([]);
        }

        $media = Media::firstWhere('id', $media_id);

        $start_time = Carbon::parse("00:00")->format('H:i');
        $end_time = Carbon::parse("03:00")->format('H:i');

        $ranges = [
            "12AM-3AM" => 0,
            "3AM-6AM" => 0,
            "6AM-9AM" => 0,
            "9AM-12PM" => 0,
            "12PM-3PM" => 0,
            "3PM-6PM" => 0,
            "6PM-9PM" => 0,
            "9PM-12AM" => 0,
        ];

        // we will calculate the views for the time ranges above
        foreach ($ranges as $range => $v) {
            $t = explode("-", $range);
            $t[0] = Carbon::parse($t[0])->format("H:i:s");
            $t[1] = Carbon::parse($t[1])->format("H:i:s");
            // 
            $ranges[$range] += $this->getRangeViews($media_id, $t[0], $t[1]);
        }

        return $this->sendResponse($ranges);
    }


    /**
     * Gets the number of views for a media in a certain time range.
     *
     * @param      $media_id    The media identifier
     * @param      $start_time  The start time
     * @param      $end_time    The end time
     *
     * @return     The range views.
     */
    private function getRangeViews($media_id, $start_time, $end_time)
    {
        $data = MediaView::where('media_id', $media_id)
            ->select('created_at', 'count')
            ->get();
    
        $views = 0;
        foreach ($data as $m) {
            $time = Carbon::parse($m->created_at)->format('H:i:s');
            if ($time >= $start_time && $time <= $end_time) {
                // $views += 1;
                $views += $m->count;
            }
        }

        return $views;
    }
}
