import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editTodoId, setEditTodoId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useContext(AuthContext);

  const userId = user.uid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 編集の場合
    if (isEdit) {
      const todoDocumentRef = doc(db, "users", userId, "todos", editTodoId);
      await updateDoc(todoDocumentRef, {
        text: todoText,
        createdAt: new Date(),
      });

      setEditTodoId("");
      setIsEdit(false);
    } else {
      const userName = user.displayName;

      // ログインユーザーの user ドキュメントがない場合に新しく追加
      const userDocumentRef = doc(db, "users", userId);
      await setDoc(userDocumentRef, {
        name: userName,
      });

      // ログインユーザーの todo コレクション（ない場合は追加）
      const todosCollectionRef = collection(db, "users", userId, "todos");
      await addDoc(todosCollectionRef, {
        text: todoText,
        createdAt: new Date(),
      });
    }

    setTodoText("");
  };

  const editTodo = (todo) => {
    setIsEdit(true);
    setTodoText(todo.text);
    setEditTodoId(todo.id);
  };

  const deleteTodo = async (id) => {
    const todoDocumentRef = doc(db, "users", userId, "todos", id);
    await deleteDoc(todoDocumentRef);
  };

  useEffect(() => {
    if (!user) return;

    const userId = user.uid;

    // ログインしているユーザーのタスクを取得
    const todosCollectionRef = collection(db, "users", userId, "todos");

    const unsubscribe = onSnapshot(todosCollectionRef, (snapshot) =>
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsubscribe;
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            required
            size="small"
            id="todoText"
            name="todoText"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            focused
            autoComplete="off"
            sx={{
              flexGrow: 1,
              "& .MuiInputBase-input": {
                color: "primary.main",
              },
            }}
          />
          <Button type="submit">{isEdit ? "編集終了" : "追加"}</Button>
        </Box>
        <List sx={{ mt: 4, color: "#fff" }}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disableGutters
              sx={{ borderBottom: "0.25px solid #FEF5AC" }}
            >
              <ListItemText primary={todo.text} />
              {isEdit ? (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    edge="end"
                    onClick={() => editTodo(todo)}
                    disabled
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => deleteTodo(todo.id)}
                    disabled
                  >
                    <DeleteIcon color="primary" />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1}>
                  <IconButton edge="end" onClick={() => editTodo(todo)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                </Stack>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default TodoList;
