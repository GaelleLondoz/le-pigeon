import React, { Component } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from '@material-ui/core';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// components
import RatingReadOnly from "../elements/RatingReadOnly"
import Avatar from "../elements/Avatar"

// scss
import "../../assets/sass/components/_searchResult.scss"


//placesAutocomplete.getVal()    (Get the current input value.)
  



class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
      
    render() {     
        return (
            <div>
            <ExpansionPanel className="SearchResult">

                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon className="MoreIcon"/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Avatar className="AgentAvatar" />
                    <div className="AgentInfo">
                        <div className="AgentDescription">
                            <Typography className="location">Paris, France</Typography>
                            <RatingReadOnly className="AverageRating"/>
                            <h2 className="AgentName">Sebastien</h2>
                            <div className="links">
                            <a>Voir Profile</a>
                            <a>Prendre rendez-vous</a>
                            </div>
                        </div>
                        <p className="AgentText">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </p>
                    </div>
                    <div className="RatingNumber">28 Avis</div>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <div className="AllRatings">
                        <div className="SingleRating">
                            <Avatar className="AvatarRating" />
                            <RatingReadOnly className="Rating"/>
                            <p className="CommentRating"> here personal comment </p>
                        </div>
                    </div>
                </ExpansionPanelDetails>

            </ExpansionPanel>
            </div>
        );
    }
}

export default SearchResult;

