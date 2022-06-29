import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonLabel, IonItem, IonIcon, IonAccordionGroup, IonAccordion, IonText, IonList, IonFooter } from "@ionic/react";
import { barChartOutline, ellipseOutline, layersOutline, logOutOutline } from 'ionicons/icons';
import profilePicture from '../assets/images/profile.png';
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { clearUser } from "../redux/slice/userSlice";

const SideMenu: React.FC = () => {

    const user = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    }

    return (
        <>
            <IonMenu menuId="side-menu" contentId='side-menu-content' disabled={user.id === ""}>
                <IonHeader>
                    <IonToolbar className='text-white ring-1 menu-background ring-slate-500'>
                        <IonTitle>payungdesakecil.id</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='menu-background'>
                    <div className='flex items-center p-3 mx-auto space-x-3 ring-1 text-slate-200 ring-slate-500'>
                        <IonAvatar>
                            <img src={profilePicture} alt='profile' />
                        </IonAvatar>
                        <div className='flex flex-col'>
                            <IonLabel>{user.name}</IonLabel>
                            <IonLabel className='text-xs text-slate-400'>{user.role}</IonLabel>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <IonItem routerLink='/admin/home' className='menu-item text-slate-300' lines='full'>
                            <IonIcon icon={barChartOutline} slot="start" className='text-slate-300' />
                            <IonLabel>Dashboard</IonLabel>
                        </IonItem>
                        <IonAccordionGroup>
                            <IonAccordion value="colors" className='bg-[#343a40] ring-1 ring-slate-500 text-slate-300'>
                                <IonItem slot="header" className='menu-item text-slate-300'>
                                    <IonIcon icon={layersOutline} slot="start" className='text-slate-300' />
                                    <IonLabel className='text-slate-300'>
                                        <IonText>Master Data</IonText>
                                    </IonLabel>
                                </IonItem>
                                <IonList slot="content" className='bg-[#343a40]'>
                                    <IonItem routerLink='/admin/pakar' className='menu-item text-slate-300' lines='full'>
                                        <IonIcon icon={ellipseOutline} slot="start" className='text-slate-300' />
                                        <IonLabel>Pakar</IonLabel>
                                    </IonItem>
                                </IonList>
                                <IonList slot="content" className='bg-[#343a40]'>
                                    <IonItem routerLink='/admin/question' className='menu-item text-slate-300' lines='full'>
                                        <IonIcon icon={ellipseOutline} slot="start" className='text-slate-300' />
                                        <IonLabel>Question</IonLabel>
                                    </IonItem>
                                </IonList>
                                <IonList slot="content" className='bg-[#343a40]'>
                                    <IonItem routerLink='/admin/user' className='menu-item text-slate-300' lines='full'>
                                        <IonIcon icon={ellipseOutline} slot="start" className='text-slate-300' />
                                        <IonLabel>User</IonLabel>
                                    </IonItem>
                                </IonList>
                            </IonAccordion>
                        </IonAccordionGroup>
                        <IonItem routerLink='/login' className='menu-item text-slate-300' lines='full' onClick={() => handleLogout()}>
                            <IonIcon icon={logOutOutline} slot="start" className='text-slate-300' />
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </div>
                </IonContent>
                <IonFooter>
                    <IonToolbar className='text-white border-b-2 menu-background border-b-slate-500'>
                        <IonTitle className='text-sm'>Version 1.0</IonTitle>
                    </IonToolbar>
                </IonFooter>
            </IonMenu>
        </>
    )
}
export default SideMenu;