import React, { useState, useEffect } from "react";
import faqsAPI from "../../services/faqsAPI";
import FaqMaterialTable from './MaterialTableComponent'
export default function Faqs() {
    const [load, setLoad] = useState(true);
    const arrayAgents = [];
    const arrayFuturTravellers = [];
    const arrayOthers = [];
    const [faqsAgentsList, setFaqsAgentsList] = useState(arrayAgents);
    const [faqsFuturTravellersList, setFaqsFuturTravellersList] = useState(arrayFuturTravellers);
    const [faqsOthersList, setFaqsOthersList] = useState(arrayOthers);
    const [faq, setFaq] = useState({
        categoryID: 0,
        question: "",
        answer: "",
        featured: false,
    });

    const initFaqs = async () => {
        let dataAgents = [];
        let dataFuturTravellers = [];
        let dataOthers = [];
        const faqsAgents = await faqsAPI.getAgentsFaqs();
        const faqsFuturTravellers = await faqsAPI.getFuturTravellersFaqs();
        const faqsOthers = await faqsAPI.getOthersFaqs();

        const loopLists = (faqs, setFaqs, data) => {
            const entries = faqs.entries();
            for (const [i, item] of entries) {
                const result = data.find((row) => row.id == item.id);
                if (!result) {
                    let row = {
                        id: item.id,
                        question: item.question,
                        answer: item.answer,
                        featured: item.featured
                    };
                    data.unshift(row);
                }
            }
            setFaqs(data);
        }

        loopLists(faqsAgents, setFaqsAgentsList, dataAgents)
        loopLists(faqsFuturTravellers, setFaqsFuturTravellersList, dataFuturTravellers)
        loopLists(faqsOthers, setFaqsOthersList, dataOthers)

    };

    const handleRefreshList = () => {
        initFaqs()
    };

    useEffect(() => {
        if (load) {
            initFaqs();
            setLoad(false);
        }
    });

    return (
        <div className="faqs__tables">
            <React.Fragment >
                <FaqMaterialTable setFaq={setFaq} faqList={faqsAgentsList} categoryID={1} title={"Questions destinées aux agents"} handleRefreshList={handleRefreshList} />
                <FaqMaterialTable setFaq={setFaq} faqList={faqsFuturTravellersList} categoryID={2} title={"Questions destinées aux futurs voyageurs"} handleRefreshList={handleRefreshList} />
                <FaqMaterialTable setFaq={setFaq} faqList={faqsOthersList} categoryID={3} title={"Autres questions"} handleRefreshList={handleRefreshList} />
            </React.Fragment >
        </div>
    );
}

