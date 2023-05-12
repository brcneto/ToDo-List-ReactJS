import React, { useState, useEffect } from 'react';
import './TodoList.css';
import Icone from './assets/icon.webp'

function TodoList() {

  const listStorage = localStorage.getItem('List')

  const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('List', JSON.stringify(list))
  }, [list])

  function addItem(form) {
    form.preventDefault();

    if (!newItem) {
      return;
    }

    setList([...list, { text: newItem, isCompleted: false }]);
    setNewItem('');
    document.getElementById('input-entrada').focus();
  }

  function clicked(index) {
    const auxList = [...list];
    auxList[index].isCompleted = !auxList[index].isCompleted;
    setList(auxList);
  }

  function deleteItem(index) {
    const auxList = [...list];
    auxList.splice(index, 1);
    setList(auxList);
  }


  return (
    <>
      <h1>Lista de Tarefas</h1>

      <form onSubmit={addItem}>
        <input
          id="input-entrada"
          type="text"
          value={newItem}
          onChange={(e) => { setNewItem(e.target.value) }}
          placeholder="Adicione uma tarefa"
        />

        <button className="add" type="submit">Add</button>
      </form>

      <div className="lista-tarefas">
        <div style={{ textAlign: 'center' }}>
          {
            list.length < 1
              ?
              <img className="icone-central" src={Icone} />
              :
              list.map((item, index) => (
                <div
                  key={index}
                  className={item.isCompleted ? "item completo" : "item"}
                >
                  <span onClick={() => { clicked(index) }}>{item.text}</span>
                  <button onClick={() => { deleteItem(index) }} className='del'>Deletar</button>
                </div>
              ))
          }
        </div>
        {
          list.length > 0 &&
          < button onClick={() => { setList([]) }} className='deleteAll'>Deletar todos</button>
        }
      </div >
    </>
  )
}

export default TodoList