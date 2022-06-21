import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hook";
import profilePicture from '../assets/images/profile.png';
import { IonImg } from "@ionic/react";
import { clearUser } from "../redux/slice/userSlice";

const HeaderUser: React.FC = () => {

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    }

    return (
        <div className="flex items-center w-screen space-x-3 bg-slate-50">
            <div className="px-2 py-3">
                <Link to={"/"} className="mx-3 text-lg font-semibold">payungkecildesa.id</Link>
            </div>
            <div className="flex justify-between grow">
                <div className="flex items-center space-x-3">
                    <Link to={"/"} className="px-3 py-2 rounded-sm hover:bg-slate-200 hover:border-b-2 hover:border-b-slate-500">Home</Link>
                    <Link to={"/konsultasi"} className="px-3 py-2 rounded-sm hover:bg-slate-200 hover:border-b-2 hover:border-b-slate-500">Konsultasi</Link>
                    <Link to={"/testminatbakat"} className="px-3 py-2 rounded-sm hover:bg-slate-200 hover:border-b-2 hover:border-b-slate-500">Tes Minat Bakat</Link>
                </div>
                <div className="flex items-center p-2 space-x-2">
                    {user.id !== "" ? (
                        <div className="flex items-center space-x-2">
                            <IonImg src={profilePicture} alt="Profile Pictue" className="w-10 h-auto" />
                            <Link to={"/"} className="px-3 py-2 rounded-sm hover:bg-slate-200 hover:border-b-2 hover:border-b-slate-500">{user.name}</Link>
                            <Link to={"/login"} onClick={() => handleLogout()} className="px-3 py-2 rounded-sm hover:bg-slate-200 hover:border-b-2 hover:border-b-slate-500">Logout</Link>
                        </div>
                    ) : (
                        <>
                            <Link to={"/register"} className="px-3 py-2 rounded-sm hover:bg-slate-200 hover:border-b-2 hover:border-b-slate-500">Daftar</Link>
                            <Link to={"/login"} className="px-3 py-2 rounded-sm hover:bg-slate-200 hover:border-b-2 hover:border-b-slate-500">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeaderUser;