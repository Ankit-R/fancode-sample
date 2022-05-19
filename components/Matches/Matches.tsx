import * as React from 'react';
import './Matches.css';
import { useState, useEffect } from "react";
import { IMatch } from '../../models/Matches';

export default function Matches() {
  const [matches, setMatches] = useState<IMatch[] | void>([]);
  let [intervalObj, setIntervalObj] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const getMatches = async() => {
      setMatches(await getMatchesData());
    }

    getMatches();
  }, []);

  useEffect(() => {
    setTimer();
  }, [matches])

  //UseCallback or move to another file
  const getMatchesData = async () => {
    const result = await fetch("http://localhost:3000/matches");
    const matches = await result.json();
    return matches;
  }

  let currentIndex: number = 0,
    interval: NodeJS.Timeout = null;

  setTimeout(() => {
    const matchContainer: HTMLElement = document.querySelector('.match-card-container') as HTMLElement,
    matchList: Element[] = Array.from(document.querySelectorAll('.match-card'));
    setIndexHighlightClass();
    // setTimer();
  
    let isDragging: boolean = false,
    startPosition: number = 0,
    currentTranslate: number = 0,
    previousTranslate: number = 0,
    animationID: number = 0;
  
    matchList.forEach((match: Element, index: number) => {
      match.addEventListener('dragstart', (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      });
    
      match.addEventListener('touchstart', dragStart(index));
      match.addEventListener('touchend', dragEnd);
      match.addEventListener('touchmove', drag);
    
      match.addEventListener('mousedown', dragStart(index));
      match.addEventListener('mouseup', dragEnd);
      match.addEventListener('mouseleave', dragEnd);
      match.addEventListener('mousemove', drag);
    });
  
    function dragStart(index: number) {
      return function (event) {
        currentIndex = index;
        startPosition = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    }
  
    function dragEnd(): void {
      isDragging = false;
      cancelAnimationFrame(animationID);

      const movedBy = currentTranslate - previousTranslate;

      if (movedBy < -100 && currentIndex < matchList.length - 1)
        currentIndex = currentIndex + 1;

      if (movedBy > 100 && currentIndex > 0)
        currentIndex = currentIndex - 1;

      setPositionByIndex();
      setIndexHighlightClass();
      setTimer();
    }
  
    function drag(event): void {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = previousTranslate + currentPosition - startPosition;
      }
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  
    function getPositionX(event): number {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
  
    function animation(): void {
      setPosition();
      if (isDragging)
        requestAnimationFrame(animation);
    }

    function setPositionByIndex(): void {
      currentTranslate = currentIndex * -window.innerWidth;
      previousTranslate = currentTranslate;
      setPosition();
    }

    function setPosition(): void {
      matchContainer.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setIndexHighlightClass(): void {
      const indexList: HTMLElement[] = Array.from(document.querySelectorAll('.match-index'));
      indexList.map((element: HTMLElement, index: number) => {
        if (index === currentIndex) {
          element.classList.add("highlighted-index");
        } else {
          element.classList.remove("highlighted-index");
        }
      });
    }
  });

  function isMatchLive(dateTime: Date): boolean {
    const currentDate = new Date().getTime();
    const countDownDate = new Date(dateTime).getTime() - currentDate;
    if (countDownDate <= 0)
      return true;
    return false;
  }


  function setTimer() {
    if (!!matches && matches.length) {
      clearTimeout(interval);
      const timerList: HTMLElement[] = Array.from(document.querySelectorAll('.match-timer'));
      interval = setInterval(() => {
        const currentDate: number = new Date().getTime();
        const matchDate: number = new Date(matches[currentIndex].time).getTime();
        const countDownDate: number = matchDate - currentDate;
        const days = Math.floor(countDownDate / (1000 * 60 * 60 * 24));
        const hours = Math.floor((countDownDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countDownDate % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDownDate % (1000 * 60)) / 1000);
        if (countDownDate > 0) {
          timerList[currentIndex].innerHTML = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds `;
        } else {
          clearTimeout(interval);
          intervalObj && clearInterval(intervalObj);
          timerList[currentIndex].innerHTML = `Match In Progress`;
        }
      }, 1000);
    }
  }

  function getMatchDetails(dateTime: Date): string {
    const currentDate = new Date().getTime();
    const countDownDate = new Date(dateTime).getTime() - currentDate;
    if (countDownDate < 0)
      return "Match In Progress";
    return "Match starts soon";
  }

  return (
    <div className="match-container">
      <div className="match-header">  
        <div className="heading-label">
          Featured Matches
        </div>
        <div className="index-container">
          {
            matches.map((match: IMatch, index: number) => (
              <div key={index + 100} className="match-index">
              </div>
            ))
          }
        </div>
      </div>
      <div className="match-card-container">
        {
          matches.map((match: IMatch) => (
            <div className="match-card"
              key={match.id} style={{width: window.innerWidth - 32 + "px"}}>
              <div className="status-container" style={{width: window.innerWidth - 32 + "px"}}>
                {
                  isMatchLive(match.time) ?
                    <div className="status-live status">
                      LIVE
                    </div>
                    : <div className="status-preview status">PREVIEW</div>
                }
              </div>
              <div className="match-background">
                <div className="live-label">
                  { isMatchLive(match.time) && <div className="live">LIVE</div>}
                </div>
                <div className="match-label">{match.matchTitle}</div>
              </div>
              <div className="match-details">
                <div className="team-details">
                  <div className="home-team team">
                    <img
                      src={match.homeTeam.logo}
                      alt=""
                      className="team-img"/>
                    <div className="team-name">{match.homeTeam.name}</div>
                  </div>
                  <div className="vs-container">
                    <div className="divider"></div>
                    <div className="vs">V</div>
                  </div>
                  <div className="away-team team">
                    <img
                      src={match.awayTeam.logo}
                      alt=""
                      className="team-img"/>
                    <div className="team-name">{match.awayTeam.name}</div>
                  </div>
                </div>
                <div className="match-timer">
                  {getMatchDetails(match.time)}
                </div>
              </div>
            </div>
            // <Match key={match.id} match={match}/>
          ))
        }
      </div>
    </div>
  )
}
