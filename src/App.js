import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriends} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Fechar" : "Add amigo"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  console.log(friends);
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="yellow">
          Você deve {friend.name} R$ {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="red">
          {friend.name} deve a você R$ {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p className="green">Você e {friend.name} estão iguais</p>
      )}
      <Button>Selecionar</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Nome</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <label>🌄 Foto</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />
      <Button>Adicionar</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Dividir uma conta com X{}</h2>
      <label>💰 Valor total</label>
      <input type="text" />
      <label>🧍‍♀️ Você gastou</label>
      <input type="text" />
      <label>👫 {"X"} gastou</label>
      <input type="text" disabled />
      <label>🤑 Quem vai pagar a conta?</label>
      <select>
        <option value="user">Você</option>
        <option value="friend">Amigo</option>
      </select>
      <Button>Dividir conta</Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
