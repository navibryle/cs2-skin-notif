import { Breadcrumb } from "~/components/Breadcrumb";

export default function RootLayout({
    children
}:{
    children: React.ReactNode;
}){
    return (
    <div>
        <Breadcrumb/>
        {children}
    </div>
    );
}
