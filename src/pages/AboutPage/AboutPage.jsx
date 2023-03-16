import { Container, Row, Col } from "react-bootstrap"
import './AboutPage.css'
import React, { useState, useEffect } from "react"


const AboutPage = () => {

    const [image, setImage] = useState("https://res.cloudinary.com/db9vrbwv4/image/upload/v1678987314/vpkttuvimur3clijiuw8.png")

    useEffect(() => {
        const timer = setTimeout(() => {
            setImage("https://res.cloudinary.com/db9vrbwv4/image/upload/v1679005678/hgkmenvvex6lv3jwl4mz.jpg")
        }, 4000)

        return () => clearTimeout(timer)
    }, [])


    return (

        <Container>
            <Row className='align-items-start'>

                <Col md={{ span: 12 }}>
                    <h1>About us, about Boomie.</h1>
                    <hr />
                    <p>What else did you expected?</p>
                </Col>
            </Row>
            <Row className='align-items-start'>

                <Col md={{ span: 12 }}>
                    <hr />
                    <h1>Boomie, that's it.</h1>
                    <h2>Where you can put books and movies to fight.</h2>
                    <hr />
                    <p>
                        Boomie, the app that helps you compare the ratings between your
                        favorite books and their screen adaptations! Our app is designed to make it easy for
                        book lovers and movie buffs alike to see how different versions of the same story
                        stack up against each other. We provide comprehensive ratings and reviews for both the
                        book and its screen adaptations, so you can make informed decisions about what to read
                        and watch next.
                    </p>
                    <p>
                        At Boomie, we believe that the best way to appreciate a great story is to
                        experience it in all its forms. Whether you're a die-hard fan of the original book
                        or a casual moviegoer looking for your next big hit, we've got you covered. Our app
                        allows you to compare ratings and reviews from a wide range of sources, so you can get
                        a well-rounded perspective on each story.
                    </p>
                </Col>
            </Row>
            <Row className='align-items-start'>
                <Col md={{ span: 12 }}>
                    <hr />
                    <h2>This is us, just me.</h2>
                    <hr />
                </Col>
                <Col sm={8} md={6} lg={3} className=" mt-2">
                    <img className="imgAbout" src={image} alt="Boomie creator" />
                </Col>
                <Col sm={12} md={6} lg={9} className=" mt-2">
                    <p>
                        Meet Rubén Briongos, the web developer who traded in his architect's hat for a beekeeper's
                        veil before realizing that coding was his true calling. Rubén is the mastermind behind our
                        app for comparing books and movies, and his love of all things tech and pop culture make him
                        the perfect fit for the job.
                    </p>
                    <p>
                        Rubén's journey to becoming a web developer is a tale as old as time: he was working as an
                        architect, keeping bees on the side, and one day he thought, "you know what this world needs?
                        Another web developer." And thus, a career was born.
                    </p>
                    <p>
                        When he's not busy crafting code and perfecting his beekeeping skills, Rubén can be found
                        lost in the pages of a good book or obsessively re-watching his favorite movies. He firmly
                        believes that the only thing better than a great story is being able to compare its book and
                        movie versions side-by-side.
                    </p>
                    <p>
                        So, if you're looking for a web developer who knows how to design a killer website and keep
                        bees alive (usually), look no further than Rubén Briongos.
                    </p>
                </Col>

            </Row>
            <Row>
                <Col md={{ span: 6, offset: 0 }}>

                    <hr />
                    <p>Books:</p>
                    <h2 className="mb-4"> Credit to Open Library. </h2>
                    <h3>We love you.</h3>
                    <hr />
                    <p>
                        At Boomie, we rely on the Open Library API to provide accurate and up-to-date
                        information about the books we feature. Open Library is a non-profit organization that
                        provides free, open access to millions of books, and we are grateful for their commitment
                        to making knowledge accessible to everyone. By using their API, we are able to provide
                        our users with a wealth of information about the books they love, including author
                        information, publication dates, and more.
                    </p>

                </Col>

                <Col md={{ span: 6, offset: 0 }}>

                    <hr />
                    <p>Movies and TV shows:</p>
                    <h2 className="mb-4"> Credit to The Movie Database. </h2>
                    <h3>We love you too.</h3>
                    <hr />
                    <p>
                        We also rely on The Movie Database (TMDb) API to provide information about
                        the screen adaptations we feature. TMDb is a community-driven database of movies
                        and TV shows, and we are grateful for their dedication to providing accurate and
                        comprehensive information about the world of cinema. By using their API, we are
                        able to provide our users with a wide range of information about each adaptation,
                        including cast and crew information, release dates, and more.
                    </p>

                </Col>
            </Row>
            <Row className='align-items-start'>

                <Col md={{ span: 12 }}>

                    <hr />
                    <p>
                        We would like to express our sincere gratitude to both Open Library and The Movie
                        Database for their contributions to our app. Without their APIs, we would not be
                        able to provide the comprehensive ratings and reviews that our users have come to
                        rely on. We are proud to partner with these organizations and support their missions
                        of making knowledge and information accessible to everyone.
                    </p>
                    <hr />

                </Col>
            </Row>
        </Container>

    )
}

export default AboutPage