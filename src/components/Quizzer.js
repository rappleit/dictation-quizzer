import { useEffect, useState } from "react";
import styles from "../styles/quizzer.module.css"


const Quizzer = ({
    wordList,
    setWordList
}) => {
    const [utterance, setUtterance] = useState(null);

    const [currentWord, setCurrentWord] = useState("")
    const [voice, setVoice] = useState(null);
    const [wordHidden, setWordHidden] = useState(true);
    const [currentWordList, setCurrentWordList] = useState([]);

    const chooseWord = () => {
        if (currentWordList.length != 0) {
            const newWord = currentWordList[Math.floor(Math.random() * currentWordList.length)]
            setCurrentWordList(currentWordList.filter((item) => item != newWord))
            setCurrentWord(newWord);
            setWordHidden(true);
        }



    }

    const repeatWord = () => {
        const synth = window.speechSynthesis;
        utterance.voice = voice;
        synth.speak(utterance);
        console.log(currentWord)
    }

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(currentWord);
        const voices = synth.getVoices();

        if (currentWord != "") {
            const u = new SpeechSynthesisUtterance(currentWord);
            setUtterance(u);
        }

        return () => {
            synth.cancel();
        };
    }, [currentWord]);

    useEffect(() => {
        if (currentWord != "") {
            const synth = window.speechSynthesis;
            utterance.voice = voice;
            setTimeout(() => {
                synth.speak(utterance);
                console.log(currentWord)
            }, 300)

        }
    }, [utterance])

    const handleVoiceChange = (event) => {
        const voices = window.speechSynthesis.getVoices();
        setVoice(voices.find((v) => v.name === event.target.value));
    };

    useEffect(() => {
        setCurrentWordList(wordList);
    }, [wordList])

    const resetList = () => {
        setCurrentWordList(wordList);
    }
    return (
        <div className={styles.main}>
            <h1>Quizzer</h1>
            <label>
                Voice:
                <select value={voice?.name} onChange={handleVoiceChange}>
                    {window.speechSynthesis.getVoices().map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name}
                        </option>
                    ))}
                </select>
            </label>
            {
                (currentWordList.length !== 0) ? <button onClick={() => chooseWord()}>Play A New Word</button> :
                    <h3>List Complete!</h3>
            }

            <div className={styles.nextActionContainer}>
                <button onClick={() => repeatWord()}>Play word again</button>
                <button onClick={() => setWordHidden(false)}>Show word</button>
                <button onClick={() => resetList()}>Reset</button>
            </div>
            <p>Words remaining: {currentWordList.length}</p>
            {(!wordHidden) ? <h1>{currentWord}</h1> : <></>}
        </div>
    );
}

export default Quizzer;