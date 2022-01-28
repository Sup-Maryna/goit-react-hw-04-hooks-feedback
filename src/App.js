import "./App.css";
import { useState } from "react";
import FeedbackOptions from "./components/feedbackOptions/FeedbackOptions";
import Statistics from "./components/statistics/Statistics";
import Section from "./components/section/Section";
import Notification from "./components/notification/Notification";
export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const state = { good, neutral, bad };
  const setFeedback = (name) => {
    switch (name) {
      case "good":
        setGood((state) => state + 1);
        break;
      case "neutral":
        setNeutral((state) => state + 1);
        break;
      case "bad":
        setBad((state) => state + 1);
        break;
      default:
        return;
    }
  };
  const countTotalFeedback = () => {
    const countTotal = good + neutral + bad;
    return countTotal;
  };
  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((good * 100) / total);
  };
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const objKey = Object.keys(state);
  return (
    <div className="FeedbackContainer">
      <Section title="Please leave feedback">
        <FeedbackOptions options={objKey} onLeaveFeedback={setFeedback} />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="No feedback given." />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
}
