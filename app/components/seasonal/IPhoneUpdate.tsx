export default function IPhoneUpdate() {
    return (
        <div className="flex flex-col items-center mt-5 mx-2 space-y-2">

            {/* Banner pro iPhone uživatele */}
            <div className="w-full bg-yellow-400 rounded-xl p-4 flex flex-col items-center space-y-3 text-center">
                <span className="text-2xl">📱</span>
                <h3 className="font-bold text-gray-900 text-lg">
                    CoPíšem? je teď i jako appka!
                </h3>
                <p className="text-gray-800 text-sm">
                    Stáhni si nativní appku pro iPhone a měj vše vždy po ruce — i s notifikacemi.
                </p>

                <a href="https://apps.apple.com/app/cop%C3%AD%C5%A1em/id6770637118"
                className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-full text-sm hover:bg-gray-700 transition"
                >
                Stáhnout na App Store
            </a>
        </div>
        </div>
);
}