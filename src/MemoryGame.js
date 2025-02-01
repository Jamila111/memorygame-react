import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const cardImages = ['🦄', '🔥', '🌞', '⭐️', '🌸', '❤️'];

const MemoryGame = () => {

const [cards, setCards] = useState([]);
const [flipped,setFlipped] = useState([]);
const [solved, setSolved] = useState([]);
const [moves, setMoves] = useState(0);
const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        initializeGame()
    }, []);

    const initializeGame = () => {
        const duplicateCards = [...cardImages, ...cardImages];
        const shuffledCards = duplicateCards.sort(() => Math.random() - 0.5);
        setCards(shuffledCards.map((image, index) => ({ id: index, image })));
    };

    const handleCardClick = (id) => {
        if(flipped.length === 2 || solved.includes(id) || flipped.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);
        setMoves(moves + 0.5);

        if(newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            if(cards[firstId].image === cards[secondId].image) {
                setSolved([...solved, firstId, secondId]);
                setFlipped([]);
                if(solved.length + 2 === cards.length) {
                    setGameWon(true);
                }
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

const resetGame = () => {
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameWon(false);
    initializeGame();
}

    return (
        <div className='memory-game'>
            <h1 className="game-title">Memory Game</h1>
            <div className='game-board'>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(card.id)}
                        >
                        {flipped.includes(card.id) || solved.includes(card.id) ? card.image : '❓'}
                    </div>
                ))}
            </div>
            <div className='game-info'>
                <p>Moves: {Math.floor(moves)}</p>
                {gameWon && <p className="congrats">Congratulations, you won in {Math.floor(moves)} moves!</p>}
                <button className={`reset-button ${gameWon ? 'game-won' : ''}`}
                        onClick={resetGame}>Reset Game</button>

            </div>

        </div>
    );
};

export default MemoryGame;