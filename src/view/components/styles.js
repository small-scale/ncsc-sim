import {css, cx} from "@emotion/css"

const AnswerGrid = css`
    display: grid;
    grid-template-columns: 50px 1fr;
    @media(min-width: 30em){
        grid-template-columns: 75px 1fr;
    }
    grid-gap: 25px;
    align-items: center;
    position:relative;
`

const AnswerListGrid = css`
    display:grid;
    grid-gap: 25px;
    position:relative;
    
`
const hoverAdjust = css`
&:hover{
    background-color: white;
    border-radius: .25rem;
    box-shadow: hsl(233, 25%, 36%) 5px 5px 0 0;
    border-color: hsl(233, 56%, 16%);
    border-style: solid;
}
`


const selectedClass = css`
    background-color: white;
    border-radius: .25rem;
    box-shadow: hsl(233, 25%, 36%) 5px 5px 0 0;
    border-color: hsl(233, 56%, 16%);
    border-style: solid;
`


const invisibleRadio = css`
  opacity: 0.00001;
  width: 1em;
  height: 1em;
  position: absolute;
  z-index:1;
  left: .5em;
  top: .4em;
`

const Tabs = css`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-gap:0px;
justify-items: center;
justify-content: space-evenly;
align-items: center;
`

const HeaderClass = css`
    display: grid;
    grid-template-columns: 75px 1fr;
    @media(min-width: 30em){
        grid-template-columns: 125px 1fr;
    }
    grid-template-areas: 
        "logo title"
        "logo subtitle";
    grid-gap: 10px 
`
const PilotsGrid = css`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    position:relative;
`

const PilotGrid = css`
    display: grid;
    grid-template-columns: 50px 1fr;
    @media(min-width: 30em){
        grid-template-columns: 100px 1fr;
        grid-template-areas:
        "logo title"
        "logo subtitle";
    }
    grid-template-areas:
        "logo title"
        "subtitle subtitle";
    grid-gap: 10px;
    position:relative; 
`

const ImageHeader = css`
    grid-area: logo;
    align-self:center;
`
const TitleHeader = css`
    grid-area: title;
    align-self:center;
    @media(min-width: 30em){
        align-self:end;
    }
`
const SubtitleHeader = css`
    grid-area: subtitle;
    align-self:start;
`

export {AnswerGrid, AnswerListGrid, PilotsGrid, PilotGrid, hoverAdjust, selectedClass, invisibleRadio, Tabs, HeaderClass, ImageHeader, TitleHeader, SubtitleHeader}