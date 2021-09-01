import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

import './index.scss';
// import './bootstrap.min(3).css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchUser } from './helpers/Helper';
import swal from "@sweetalert/with-react";


function App({match}) {
    const { media_id, user_slug } = match.params

    const user = fetchUser(user_slug)
        .then((user) => {
            return user;
        }).catch(({ message }) => swal("Error", message, 'error'));

    const params = { media_id, user_id: user.id}

    return (
        <>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
                crossOrigin="anonymous"
            />

            <Header />
            <main className="referal-page">
                <Main match={params} />
            </main>
            <Footer />
        </>
    );
}

export default App;
