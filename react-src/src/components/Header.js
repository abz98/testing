import { Button } from "semantic-ui-react"

const Header = ({ setToken,logo }) => (<div className='App' data-testid="app-body">
    <div className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='App-intro' title="mern-crud">MERN CRUD</h1>
        <p>
            A simple records system using MongoDB, Express.js, React.js, and
            Node.js. REST API was implemented on the back-end.
            <br />
            CREATE, READ, UPDATE, and DELETE operations are updated in
            real-time to online users using Socket.io.
        </p>
        <Button onClick={() => setToken()}>Logout</Button>
    </div>
</div>)

export default Header