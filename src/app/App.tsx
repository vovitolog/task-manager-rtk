import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@mui/material';
import { Login } from 'features/auth/Login/Login'
import './App.css'
import { ErrorSnackbar } from 'common/components'
import { useActions } from 'common/hooks';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { selectAppStatus, selectIsInitialized } from 'app/app.selectors';
import { authThunks } from 'features/auth/auth.reducer';
import { TodolistsList } from 'features/todolists-list/TodolistsList';

function App() {
    const status = useSelector(selectAppStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {initializeApp, logout} = useActions(authThunks)

    useEffect(() => {
        initializeApp({})
    }, [])

    const logoutHandler = () => logout({})

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App" >
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <Typography variant="h6">
                            Todos
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container  fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
