import * as React from "react"
import TweetInput from "./TweetInput"
import "./TweetBox.css"

export default function TweetBox(props) {
  const [buttonActive, setButtonActive] = React.useState(false);

  const handleOnTweetTextChange = (e) => {
    props.setTweetText(e.target.value)
    if(e.target.value.length < 141 && e.target.value.length > 0) {
      setButtonActive(true);
    }
    else {
      setButtonActive(false);
    }
  }

  const handleOnSubmit = () => {
    var newTweet = {
      name: props.userProfile.name,
      handle: props.userProfile.handle,
      text: props.tweetText,
      comments: 0,
      retweets: 0,
      likes: 0,
      id: props.tweets.length
    }
    setButtonActive(false);
    props.userProfile.numTweets++;
    props.setTweets(props.tweets.concat([newTweet]))
    props.setTweetText("");

  }
  return (
    <div className="tweet-box">
      <TweetInput value={props.tweetText} handleOnChange={handleOnTweetTextChange}/>

      <div className="tweet-box-footer">
        <TweetBoxIcons />
        <TweetCharacterCount tweetLength={props.tweetText.length} buttonActive={buttonActive} />
        <TweetSubmitButton disabled = {!buttonActive} handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  )
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  )
}

export function TweetCharacterCount(props) {
  
  // ADD CODE HERE
  return <span className={props.tweetLength>140 ? "red" : ""}>{props.tweetLength>0 ? 140-props.tweetLength:""}</span>
}

export function TweetSubmitButton({ disabled, handleOnSubmit }) {
  return (
    <div className="tweet-submit">
      <i className="fas fa-plus-circle"></i>
      <button disabled={disabled} className="tweet-submit-button" onClick={handleOnSubmit}>Tweet</button>
    </div>
  )
}
