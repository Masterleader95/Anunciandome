// Módulo: Geolocalización
const GeolocationModule = (() => {
    let userLocation = { country: null, city: null }; // Almacena la ubicación del usuario

    const getLocation = (onSuccess, onError) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Ubicación detectada:", position.coords);
                    userLocation = {
                        country: "CO", // Simulación: Cambiar con API real si lo implementas
                        city: "bogota", // Simulación: Cambiar con API real si lo implementas
                    };
                    if (onSuccess) onSuccess(userLocation);
                },
                () => {
                    console.log("Geolocalización no permitida. Usando ubicación predeterminada.");
                    userLocation = { country: "CO", city: null };
                    if (onError) onError(userLocation);
                }
            );
        } else {
            console.log("Geolocalización no soportada. Usando ubicación predeterminada.");
            userLocation = { country: "CO", city: null };
            if (onError) onError(userLocation);
        }
    };

    const getUserLocation = () => userLocation;

    return { getLocation, getUserLocation };
})();

