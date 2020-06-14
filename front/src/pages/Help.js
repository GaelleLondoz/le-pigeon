import React, { useState, useEffect } from "react";
import FaqsAPI from "../components/services/faqsAPI";
import { Container, Typography, Grid } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Header from "./faq/Header";
import CardFaq from "../components/faq/CardFaq";
import Paginator from "../components/Pagination";
import agent from "../assets/images/agent.svg";
import traveller from "../assets/images/traveller.svg";
import others from "../assets/images/others.svg";



const Help = () => {
    const [faqs, setFaqs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 5;

    const fetchFaqsFeatured = async () => {
        try {
            const data = await FaqsAPI.getFeaturedFaqs();
            setFaqs(data);
            // handleDisplayFeatured()
        } catch (error) {
            console.log(error.response);
        }
    };

    const fetchFaqsAgents = async () => {
        try {
            const data = await FaqsAPI.getAgentsFaqs();
            setFaqs(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const fetchFaqsTravellers = async () => {
        try {
            const data = await FaqsAPI.getFuturTravellersFaqs();
            setFaqs(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const fetchFaqsOthers = async () => {
        try {
            const data = await FaqsAPI.getOthersFaqs();
            setFaqs(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        handleDisplayFeatured()
    }, []);

    const faqSelectedBreadcrumb = () => {
        const breadcrumbs = document.querySelector('.breadcrumbs')
        !breadcrumbs.classList.contains('faqs-selected') && breadcrumbs.classList.add('faqs-selected')
        const faqsContainer = document.querySelector('.faqs-container')
        faqsContainer.classList.contains('faqs-featured') && faqsContainer.classList.remove('faqs-featured')
    }

    const handleFaqSelectedBreadcrumb = (text) => {
        document.querySelector('.current-faqs').innerText = text

    }
    const handleDisplayFeatured = (e) => {
        setCurrentPage(1)
        const faqsContainer = document.querySelector('.faqs-container')
        !faqsContainer.classList.contains('faqs-featured') && faqsContainer.classList.add('faqs-featured')
        const breadcrumbs = document.querySelector('.breadcrumbs')
        breadcrumbs.classList.contains('faqs-selected') && breadcrumbs.classList.remove('faqs-selected')
        fetchFaqsFeatured()
    };

    const handleDisplayAgents = (e) => {
        setCurrentPage(1)
        faqSelectedBreadcrumb()
        handleFaqSelectedBreadcrumb("Agents")
        fetchFaqsAgents()
    };

    const handleDisplayTravellers = (e) => {
        setCurrentPage(1)
        faqSelectedBreadcrumb()
        handleFaqSelectedBreadcrumb("Futurs voyageurs")
        fetchFaqsTravellers()
    };

    const handleDisplayOthers = (e) => {
        setCurrentPage(1)
        faqSelectedBreadcrumb()
        handleFaqSelectedBreadcrumb("Autres")
        fetchFaqsOthers()
    };

    const handlePaginationChange = (e, page) => {
        setCurrentPage(page);
    };

    const paginatedFaqs = Paginator.getData(
        faqs,
        currentPage,
        ITEMS_PER_PAGE
    );

    return (
        <div id="help">
            <Header />
            <Container>
                <Grid item xs={12} md={8} className="faq__categories">
                    <div className="faq__categorie" id="faq-agents" onClick={handleDisplayAgents}>
                        <img src={agent} alt="agent" />
                        <Typography variant="h5">
                            Agents
                                </Typography>
                    </div>
                    <div className="faq__categorie" id="faq-travellers" onClick={handleDisplayTravellers}>
                        <img src={traveller} alt="traveller" />
                        <Typography variant="h5">
                            Futurs voyageurs
                                </Typography>
                    </div>
                    <div className="faq__categorie" id="faq-others" onClick={handleDisplayOthers}>
                        <img src={others} alt="others" />
                        <Typography variant="h5">
                            Autres
                                </Typography>
                    </div>
                </Grid>
            </Container>
            <Container>
                <Grid item xs={12} md={8} className="breadcrumbs">
                    <p className="breadcrumbs-featured" onClick={handleDisplayFeatured}>Aide</p>
                    <ArrowForwardIosIcon className="breadcrumbs-arrow" />
                    <p className="current-faqs">Aide</p>
                </Grid>
            </Container>
            <Container>
                <Grid className="faqs-container" container>
                    <Grid item xs={12} md={8} className="faq-featured-title-container">
                        <Typography variant="h5" className="faq-featured-title">
                            Trouvez votre réponse parmi les questions les plus populaires :
                            </Typography>
                    </Grid>

                    {paginatedFaqs.map((faq) => {
                        return <CardFaq key={faq.id} faq={faq} />
                    })}
                </Grid>
                <Grid className="pagination">
                    {faqs.length > 5 && (
                        <Paginator
                            length={faqs.length}
                            page={currentPage}
                            onPageChanged={handlePaginationChange}
                            itemsByPage={ITEMS_PER_PAGE}
                        />
                    )}
                </Grid>
            </Container>
        </div>
    )
}

export default Help;
