import React, { useContext, useEffect, useState } from "react";
import { Typography, Avatar, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const CardFaq = ({ faq }) => {

    const handleExpandCard = (e) => {
        e.target.closest('.card-faq').classList.toggle('expanded')
    }
    return (
        <Grid container>
            <Grid item xs={12} md={8} className="card-faq__container">
                <div className="card-faq">
                    <div className="question"> <Typography component="p">{faq.question}</Typography></div>
                    <div className="answer">
                        <Typography component="p">{faq.answer}</Typography>
                    </div>
                    <div className="card-faq__read-more-less"><span className="more" onClick={handleExpandCard}>En savoir plus <ExpandMoreIcon className="arrow-icon" /></span><span className="less" onClick={handleExpandCard}>Fermer <ExpandLessIcon className="arrow-icon" /></span></div>

                </div>
            </Grid>
        </Grid>
    );
};

export default CardFaq;



