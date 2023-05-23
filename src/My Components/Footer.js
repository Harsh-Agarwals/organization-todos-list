import React from "react";

export default function Footer() {
    let footerStyle = {
        bottom: "0",
        width: "100%",
    };
    return (
        <div className="text-bg-dark text-center p-2" style={footerStyle}>
            <p className="pt-3">
                &copy; All Rights Reserved @yourCompanyNameHere
            </p>
        </div>
    );
}
