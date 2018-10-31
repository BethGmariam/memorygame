import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import DescriptionCard from "./components/DescriptionCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";
const shuffle = require('shuffle-array');


class App extends Component {

    //Array of memory images
    state = {
      images:friends,
      clickedImageIdArray:[],
      score:0,
      topScore:0,
      msg:'Click an image to begin'
    }
  
  shuffleImagesFn = (id) => {
    let flag = 0 // detect id (if not found in the cliked imageIdArray)
    const arraylength = this.state.images.length;
    for(let i=0;i<arraylength;i++){
      if(id===this.state.clickedImageIdArray[i]) // if image clicked more than once reset score
        { 
          flag = 1; // if clicked image twice reset the state values, and set flag to 1
          this.setState({
            msg:"You Guessed incorrectly!",
        });

          this.setState({
            images:friends,
            score:0,
            clickedImageIdArray:[],
            counter:0
          });

 
        }
        
    }
    if(flag===0){
      // console.log(id)
      this.state.clickedImageIdArray.push(id);// store image id and add +1 to the score
      var currentScore = this.state.score + 1;
      this.setState({
      score:currentScore,
      msg:"You Guessed correctly!",
      images:shuffle(this.state.images)
      })
      var stateTopScore = this.state.topScore;
      if(stateTopScore<=currentScore){
        this.setState({topScore:currentScore})
        // this.state.topScore = currentScore
      }

    }
  }
  

  // Map over images and render a FriendCard component for each friend object
  render() {
    return (
      <div class="mainContainerDiv">
        <Title> 
            <h2><span className="msg">{this.state.msg} </span></h2>
            <h3>
            <span className="score">Score:{this.state.score} </span> | <span className="topScore">Top Score:{this.state.topScore}</span>
            </h3>
        </Title>
          <DescriptionCard> 
            <h1>Cliky Game!</h1>
            <h2>click on an image to earn points, but do not click on any more than once!</h2>

          </DescriptionCard>

      <Wrapper>
        {this.state.images.map(item => (
          <FriendCard
            shuffleImages={()=>this.shuffleImagesFn(item.id)}
            id={item.id}
            name={item.name}
            image={item.image}
            key={item.id}
          />
        ))}
      </Wrapper>
      </div>
    );
  }
}

export default App;
