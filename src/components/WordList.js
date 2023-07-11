import { useEffect, useState } from "react";
import styles from "../styles/wordlist.module.css"

const WordList = ({
    wordList,
    setWordList
}) => {

    const [input, setInput] = useState("");
    const [hideList, setHideList] = useState(false);

    const addWord = (e) => {
        e.preventDefault();
        const addArr = input.replace(/ /g,'').split(",")
        setWordList(wordList.concat(addArr));
        setInput("");
    }

    const clearList = () => {
        setWordList([])
    }

    useEffect(() => {
        localStorage.setItem("wordList", wordList);
    }, [wordList.length])
    return (
        <div className={styles.main}>
            <h2>Add words here:</h2>
            <p>Split multiple words with commas ","</p>
            <form
                onSubmit={(e) => addWord(e)}>
                <textarea
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}></textarea>
                <button type="submit">Add +</button>
            </form>
            <div className={styles.listHeader}>
                <h3>Your word list:</h3>
                <button onClick={clearList} className={styles.clearButton}>Clear list</button>
            </div>
                <button onClick={() => setHideList(!hideList)} className={styles.hideList}>{(hideList) ? "Show" : "Hide"} List</button>
            <ol style={(hideList) ? {"background": "#fff"} : {"background": "none"}}>
                {wordList.map((word, i) => (
                    <li key={i}>
                        {word}
                    </li>
                ))}
            </ol>

        </div>
    );
}

export default WordList;