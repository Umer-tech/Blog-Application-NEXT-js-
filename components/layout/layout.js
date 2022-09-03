import MainNavigation from './main-navigationbar';
function Layout(props){
    return(
        <>
            <MainNavigation/>
            <content>{props.children}</content>
        </>
    )
}

export default Layout;