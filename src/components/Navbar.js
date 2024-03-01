const Navbar = () => {
    return ( 
        <div className="navbar">
            <h1 className="navbar-title">Event Booking Website</h1>
        <div className="links">
            <a href="/" className="nav-link">HomePage</a>
            <a href="/admin" className="nav-link admin-link">Admin Panel</a>
        </div>
        </div>
     );
}
 
export default Navbar;