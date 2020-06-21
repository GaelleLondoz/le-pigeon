import React, { useState, useEffect } from "react";
import faqsAPI from "../../services/faqsAPI";
import FaqMaterialTable from './MaterialTableComponent'

export default function Faqs() {
    const array = [];
    const [faqsList, setFaqsList] = useState(array);

    const [faq, setFaq] = useState({
        categoryID: 0,
        question: "",
        answer: "",
        featured: false,
    });

    const initFaqs = async () => {
        let data = [];
        const faqs = await faqsAPI.getFaqs();

        const loadFaqsLists = (faqs, setFaqs, data) => {
            const entries = faqs.entries();
            for (const [i, item] of entries) {
                const result = data.find((row) => row.id == item.id);
                if (!result) {
                    let row = {
                        id: item.id,
                        categoryID: item.categoryID,
                        question: item.question,
                        answer: item.answer,
                        featured: item.featured
                    };
                    data.unshift(row);
                }
            }
            setFaqs(data);
        }

        loadFaqsLists(faqs, setFaqsList, data)

    };

    const handleRefreshList = () => {
        initFaqs()
    };

    useEffect(() => {
        initFaqs();
    }, []);

    return (
        <div className="faqs__tables">
            <React.Fragment >
                <FaqMaterialTable setFaq={setFaq} faqList={faqsList} title={"Questions fréquemment posées"} handleRefreshList={handleRefreshList} />
            </React.Fragment >
        </div>
    );
}

