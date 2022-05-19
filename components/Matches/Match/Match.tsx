import React from 'react'
import { IMatch } from '../../../models/Matches';

export default function Match({ match }) {

    function isMatchLive(match: IMatch): boolean {
        return true;
    }
    
    function getMatchDetails(): string {
        return "Match In Progress";
    }
    return (
        <div key={match.id} className="match-card" style={{width: window.innerWidth - 32 + "px"}}>
        {isMatchLive(match) ?
        <div className="status-live status">
            LIVE
        </div>
        : <div className="status-preview status">PREVIEW</div> }
        <div className="match-background">
        <div className="live-label">
            { isMatchLive(match) && <div className="live">LIVE</div>}
        </div>
        <div className="match-label">{match.matchTitle}</div>
        </div>
        <div className="match-details">
        <div className="team-details">
            <div className="home-team">
            {/* <img
                src="https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/MI-CR3@2x.png"
                alt="" /> */}
            <div>Royal Challengers Bangalore</div>
            </div>
            <div className="vs-container">
            <div className="divider"></div>
            <div className="vs">V</div>
            </div>
            <div className="away-team">
            {/* <img
                src="https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/MI-CR3@2x.png"
                alt="" /> */}
            <div>Mumbai Indians</div>
            </div>
        </div>
        <div className="match-timer">
            {getMatchDetails()}
        </div>
        </div>
    </div>
    )
}
