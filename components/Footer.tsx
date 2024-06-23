const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="absolute bottom-0 w-full mt-10 text-center bg-slate-100">
            Portsmouth Point ©{year}
        </div>
    );
};

export default Footer;
