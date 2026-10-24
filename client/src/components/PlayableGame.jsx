import React, { useEffect, useRef, useState } from 'react';

const SNAKE_COLUMNS = 16;
const SNAKE_ROWS = 12;
const STARTING_SNAKE = [{ x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }];
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1, name: 'up' },
  w: { x: 0, y: -1, name: 'up' },
  ArrowDown: { x: 0, y: 1, name: 'down' },
  s: { x: 0, y: 1, name: 'down' },
  ArrowLeft: { x: -1, y: 0, name: 'left' },
  a: { x: -1, y: 0, name: 'left' },
  ArrowRight: { x: 1, y: 0, name: 'right' },
  d: { x: 1, y: 0, name: 'right' },
};

function randomFood(snake) {
  const available = [];
  for (let y = 0; y < SNAKE_ROWS; y += 1) {
    for (let x = 0; x < SNAKE_COLUMNS; x += 1) {
      if (!snake.some(segment => segment.x === x && segment.y === y)) available.push({ x, y });
    }
  }
  return available[Math.floor(Math.random() * available.length)];
}

function SnakeGame() {
  const [snapshot, setSnapshot] = useState(() => ({
    snake: STARTING_SNAKE,
    food: randomFood(STARTING_SNAKE),
    score: 0,
  }));
  const [status, setStatus] = useState('playing');
  const snapshotRef = useRef(snapshot);
  const directionRef = useRef(DIRECTIONS.ArrowRight);

  const reset = () => {
    const freshGame = { snake: STARTING_SNAKE, food: randomFood(STARTING_SNAKE), score: 0 };
    snapshotRef.current = freshGame;
    directionRef.current = DIRECTIONS.ArrowRight;
    setSnapshot(freshGame);
    setStatus('playing');
  };

  useEffect(() => {
    if (status !== 'playing') return undefined;
    const timer = window.setInterval(() => {
      const current = snapshotRef.current;
      const direction = directionRef.current;
      const head = current.snake[0];
      const nextHead = { x: head.x + direction.x, y: head.y + direction.y };
      const eating = nextHead.x === current.food.x && nextHead.y === current.food.y;
      const bodyToCheck = eating ? current.snake : current.snake.slice(0, -1);
      const hitWall = nextHead.x < 0 || nextHead.x >= SNAKE_COLUMNS || nextHead.y < 0 || nextHead.y >= SNAKE_ROWS;
      const hitSnake = bodyToCheck.some(segment => segment.x === nextHead.x && segment.y === nextHead.y);

      if (hitWall || hitSnake) {
        setStatus('over');
        return;
      }

      const snake = [nextHead, ...current.snake];
      if (!eating) snake.pop();
      const next = {
        snake,
        food: eating ? randomFood(snake) : current.food,
        score: current.score + (eating ? 10 : 0),
      };
      snapshotRef.current = next;
      setSnapshot(next);
    }, 145);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status !== 'playing') return undefined;
    const onKeyDown = event => {
      const nextDirection = DIRECTIONS[event.key] || DIRECTIONS[event.key.toLowerCase()];
      if (!nextDirection) return;
      event.preventDefault();
      const current = directionRef.current;
      if (nextDirection.x !== -current.x && nextDirection.y !== -current.y) directionRef.current = nextDirection;
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [status]);

  const turn = direction => {
    const current = directionRef.current;
    if (direction.x !== -current.x && direction.y !== -current.y) directionRef.current = direction;
  };
  const cells = [];
  for (let y = 0; y < SNAKE_ROWS; y += 1) {
    for (let x = 0; x < SNAKE_COLUMNS; x += 1) {
      const snakeIndex = snapshot.snake.findIndex(segment => segment.x === x && segment.y === y);
      const isFood = snapshot.food.x === x && snapshot.food.y === y;
      cells.push(<span key={`${x}-${y}`} className={`snake-cell${snakeIndex === 0 ? ' snake-cell--head' : snakeIndex > 0 ? ' snake-cell--body' : ''}${isFood ? ' snake-cell--food' : ''}`} />);
    }
  }

  return (
    <div className="playable-game snake-game">
      <div className="playable-game__top"><span>SCORE <b>{snapshot.score}</b></span><span>BEST <b>{snapshot.score}</b></span></div>
      <div className="snake-board" role="img" aria-label={`Snake game board. Score ${snapshot.score}. Use arrow keys or WASD to move.`}>{cells}</div>
      {status === 'over' && <div className="game-message"><b>Game over!</b><span>You scored {snapshot.score} points.</span><button className="button button--dark" onClick={reset}>↻ Play again</button></div>}
      <div className="snake-controls" aria-label="Snake movement controls">
        <button aria-label="Move up" onClick={() => turn(DIRECTIONS.ArrowUp)}>↑</button>
        <div><button aria-label="Move left" onClick={() => turn(DIRECTIONS.ArrowLeft)}>←</button><button aria-label="Move down" onClick={() => turn(DIRECTIONS.ArrowDown)}>↓</button><button aria-label="Move right" onClick={() => turn(DIRECTIONS.ArrowRight)}>→</button></div>
      </div>
      <small className="game-instructions">Use arrow keys or WASD · Touch controls work on mobile</small>
    </div>
  );
}

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getWinner(board) {
  const line = WINNING_LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  return line ? board[line[0]] : null;
}

function chooseComputerMove(board) {
  const openCells = board.map((cell, index) => cell ? -1 : index).filter(index => index >= 0);
  for (const mark of ['O', 'X']) {
    for (const index of openCells) {
      const testBoard = [...board];
      testBoard[index] = mark;
      if (getWinner(testBoard)) return index;
    }
  }
  if (openCells.includes(4)) return 4;
  const corners = openCells.filter(index => [0, 2, 6, 8].includes(index));
  const choices = corners.length ? corners : openCells;
  return choices[Math.floor(Math.random() * choices.length)];
}

function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [twoPlayers, setTwoPlayers] = useState(false);
  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);

  useEffect(() => {
    if (twoPlayers || turn !== 'O' || winner || draw) return undefined;
    const timer = window.setTimeout(() => {
      const move = chooseComputerMove(board);
      if (move === undefined) return;
      const nextBoard = [...board];
      nextBoard[move] = 'O';
      setBoard(nextBoard);
      setTurn('X');
    }, 380);
    return () => window.clearTimeout(timer);
  }, [board, turn, twoPlayers, winner, draw]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
  };

  const playCell = index => {
    if (board[index] || winner || draw || (!twoPlayers && turn === 'O')) return;
    const nextBoard = [...board];
    nextBoard[index] = turn;
    setBoard(nextBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const message = winner ? (winner === 'X' && !twoPlayers ? 'You win!' : `${twoPlayers ? `Player ${winner}` : 'Computer'} wins!`) : draw ? 'It’s a draw!' : twoPlayers ? `Player ${turn}’s turn` : turn === 'X' ? 'Your turn — you’re X' : 'Computer is thinking…';

  return (
    <div className="playable-game tic-game">
      <div className="tic-game__heading"><span className="tic-game__turn">{winner || draw ? message : message}</span><button className="mode-toggle" onClick={() => { setTwoPlayers(!twoPlayers); reset(); }}>{twoPlayers ? '2 players' : 'vs computer'} <span>⌄</span></button></div>
      <div className="tic-board" role="group" aria-label="Tic-Tac-Toe board">
        {board.map((cell, index) => <button key={index} className={`tic-cell${cell ? ` tic-cell--${cell.toLowerCase()}` : ''}`} onClick={() => playCell(index)} aria-label={`Cell ${index + 1}${cell ? `: ${cell}` : ', empty'}`} disabled={Boolean(cell || winner || draw || (!twoPlayers && turn === 'O'))}>{cell}</button>)}
      </div>
      <div className="tic-game__footer"><span><i className="tic-mark-x">X</i> You <i className="tic-mark-o">O</i> {twoPlayers ? 'Player 2' : 'Computer'}</span><button className="button button--dark tic-reset" onClick={reset}>↻ New game</button></div>
    </div>
  );
}

const MEMORY_SYMBOLS = ['🍋', '🍓', '🍇', '🍉', '🍊', '🥝'];

function createMemoryDeck() {
  const cards = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS].map((symbol, index) => ({ id: index, symbol }));
  for (let index = cards.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]];
  }
  return cards;
}

function MemoryGame() {
  const [deck, setDeck] = useState(createMemoryDeck);
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const complete = matchedCards.length === deck.length;

  useEffect(() => {
    if (openCards.length !== 2) return undefined;
    const timer = window.setTimeout(() => {
      const [first, second] = openCards;
      if (deck[first].symbol === deck[second].symbol) {
        setMatchedCards(matched => [...matched, first, second]);
      }
      setOpenCards([]);
    }, 750);
    return () => window.clearTimeout(timer);
  }, [openCards, deck]);

  const reset = () => {
    setDeck(createMemoryDeck());
    setOpenCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const revealCard = index => {
    if (complete || openCards.length >= 2 || openCards.includes(index) || matchedCards.includes(index)) return;
    setOpenCards(current => [...current, index]);
    if (openCards.length === 1) setMoves(count => count + 1);
  };

  return (
    <div className="playable-game memory-game">
      <div className="memory-heading"><div><span className="game-mode-label">FLIP · MATCH · REPEAT</span><b>Find all the pairs!</b></div><span className="memory-moves">MOVES <b>{moves}</b></span></div>
      <div className="memory-board" role="group" aria-label={`Memory match board. ${matchedCards.length / 2} of 6 pairs found.`}>
        {deck.map((card, index) => {
          const revealed = openCards.includes(index) || matchedCards.includes(index);
          return <button key={card.id} className={`memory-card${revealed ? ' memory-card--revealed' : ''}${matchedCards.includes(index) ? ' memory-card--matched' : ''}`} onClick={() => revealCard(index)} aria-label={revealed ? `Card ${index + 1}: ${card.symbol}` : `Reveal card ${index + 1}`} aria-pressed={revealed} disabled={revealed || openCards.length >= 2 || complete}>{revealed ? card.symbol : '✦'}</button>;
        })}
      </div>
      <div className="memory-footer"><span>{complete ? '🎉 Perfect match! You found them all.' : 'Match the fruit pairs to win!'}</span><button className="button button--secondary mini-reset" onClick={reset}>↻ Restart</button></div>
    </div>
  );
}

const RPS_CHOICES = [
  { name: 'Rock', icon: '✊', beats: 'Scissors' },
  { name: 'Paper', icon: '✋', beats: 'Rock' },
  { name: 'Scissors', icon: '✌️', beats: 'Paper' },
];

function RockPaperScissorsGame() {
  const [round, setRound] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  const play = choice => {
    const computerChoice = RPS_CHOICES[Math.floor(Math.random() * RPS_CHOICES.length)];
    const result = choice.name === computerChoice.name ? 'tie' : choice.beats === computerChoice.name ? 'win' : 'lose';
    setRound({ player: choice, computer: computerChoice, result });
    if (result === 'win') setScore(current => ({ ...current, player: current.player + 1 }));
    else if (result === 'lose') setScore(current => ({ ...current, computer: current.computer + 1 }));
    else setScore(current => ({ ...current, ties: current.ties + 1 }));
  };

  const reset = () => {
    setRound(null);
    setScore({ player: 0, computer: 0, ties: 0 });
  };

  const resultText = round?.result === 'win' ? 'You win this round!' : round?.result === 'lose' ? 'Computer wins this round!' : 'It’s a tie!';

  return (
    <div className="playable-game rps-game">
      <div className="rps-heading"><span className="game-mode-label">BEST OF YOUR BREAK</span><b>Make your move!</b></div>
      <div className="rps-scoreboard"><span>You <b>{score.player}</b></span><i>:</i><span><b>{score.computer}</b> Computer</span></div>
      <div className="rps-arena" aria-live="polite">
        <div className={`rps-pick${round ? ' rps-pick--active' : ''}`}><span>{round?.player.icon || '❔'}</span><small>You</small></div>
        <b className="rps-versus">{round ? 'VS' : 'READY?'}</b>
        <div className={`rps-pick${round ? ' rps-pick--active' : ''}`}><span>{round?.computer.icon || '❔'}</span><small>Computer</small></div>
      </div>
      <p className="rps-result">{round ? resultText : 'Choose rock, paper or scissors'}</p>
      <div className="rps-choices">
        {RPS_CHOICES.map(choice => <button className="rps-choice" key={choice.name} onClick={() => play(choice)}><span>{choice.icon}</span><b>{choice.name}</b></button>)}
      </div>
      <div className="rps-footer"><span>Ties <b>{score.ties}</b></span><button className="button button--secondary mini-reset" onClick={reset}>↻ Reset score</button></div>
    </div>
  );
}

export default function PlayableGame({ type }) {
  if (type === 'snake') return <SnakeGame />;
  if (type === 'tic-tac-toe') return <TicTacToeGame />;
  if (type === 'memory') return <MemoryGame />;
  if (type === 'rock-paper-scissors') return <RockPaperScissorsGame />;
  return null;
}
