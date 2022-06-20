import { IonContent, IonPage } from "@ionic/react"
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <IonPage>
            <div className="w-screen bg-slate-100 flex space-x-3 items-center">
                <div className="px-2 py-3">
                    <Link to={"/"} className="font-semibold text-lg mx-3">payungkecildesa.id</Link>
                </div>
                <div className="flex grow justify-between">
                    <div className="flex space-x-3 items-center">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/"}>Konsultasi</Link>
                        <Link to={"/"}>Tes Minat Bakat</Link>
                    </div>
                    <div className="flex p-2 space-x-2 items-center">
                        <Link to={"/"}>Daftar</Link>
                        <Link to={"/"}>Login</Link>
                    </div>
                </div>
            </div>
            <IonContent>
                Test
            </IonContent>
        </IonPage>
    )
}

export default Home;