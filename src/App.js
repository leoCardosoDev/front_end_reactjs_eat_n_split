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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add amigo</Button>
      </div>
      <div>
        <FormSplitBill />
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li key={friend.id}>
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

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👫 Nome</label>
      <input type="text" />

      <label>🌄 Foto</label>
      <input type="text" />
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

function Button({ children }) {
  return <button className="button">{children}</button>;
}
