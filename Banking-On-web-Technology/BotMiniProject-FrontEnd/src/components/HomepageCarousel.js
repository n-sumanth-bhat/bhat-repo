import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core'

import image6 from "../images/homepage/BOT6.jpg";
import image9 from "../images/homepage/BOT9.jpg";
import image10 from "../images/homepage/BOT10.jpg";
import image12 from "../images/homepage/BOT12.jpg";
import image13 from "../images/homepage/BOT13.jpg";
import image14 from "../images/homepage/BOT14.jpg";
import image16 from "../images/homepage/BOT16.jpg";


const useStyles = makeStyles({
    carouselHomepage: {
        marginTop: "130px",
        textAlign: "center"
    },
    carouselNext: {
        right: "70px"
    },
    carouselPrev: {
        left: "70px"
    },
})




export default function HomepageCarousel() {
    const classes = useStyles();
    const [isRender, setIsRender] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        if (path === "/") {
            setIsRender(true);
        }
        else {
            setIsRender(false);

        }
    })

    var items = [

        {
            image: image6
        },

        {
            image: image9
        },
        {
            image: image10
        },

        {
            image: image12
        },
        {
            image: image13
        },
        {
            image: image14
        },

        {
            image: image16
        },
    ]


    return (
        <div id="carouselContainer">
            {isRender &&
                <Carousel className={classes.carouselHomepage}>
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
            }
        </div>
    )
}

function Item(props) {
    return (
        <img src={props.item.image} width="1250px" height="375px" alt="bot" />
    )
}