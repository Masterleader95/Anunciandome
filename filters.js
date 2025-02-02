// Módulo: Filtros
document.addEventListener("DOMContentLoaded", () => {
    const countryFilter = document.getElementById("country-filter");
    const cityFilter = document.getElementById("city-filter");
    const categoryFilter = document.getElementById("category-filter");
    const subcategoryFilter = document.getElementById("subcategory-filter");
    const filterButton = document.getElementById("filter-button");
    const carouselContainer = document.querySelector(".carousel");
    const noResultsMessage = document.createElement("div"); // Mensaje de "Espacio disponible"

    noResultsMessage.textContent = "Espacio disponible: Sé el primero en anunciarte.";
    noResultsMessage.style.display = "none"; // Ocultar por defecto
    noResultsMessage.style.textAlign = "center";
    noResultsMessage.style.fontSize = "1.2em";
    carouselContainer.parentElement.appendChild(noResultsMessage);

    let isFiltered = false; // Bandera para determinar si se han aplicado filtros manuales

    // Leer parámetros de la URL y establecer valores en los filtros
    const initializeFiltersFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCountry = urlParams.get("country");
        const selectedCity = urlParams.get("city");
        const selectedCategory = urlParams.get("category");
        const selectedSubcategory = urlParams.get("subcategory");

        // Inicializar valores de los filtros si existen en la URL
        if (selectedCountry) {
            countryFilter.value = selectedCountry;
            updateCityOptions(selectedCountry);
        } else {
            countryFilter.value = ""; // Resetear si no hay país en URL
        }

        if (selectedCity) cityFilter.value = selectedCity;
        if (selectedCategory) categoryFilter.value = selectedCategory;
        if (selectedSubcategory) subcategoryFilter.value = selectedSubcategory;
    };

    // Actualizar las opciones de ciudad según el país seleccionado
    const updateCityOptions = (country = countryFilter.value) => {
        const allCities = Array.from(cityFilter.options);
        allCities.forEach(option => {
            option.style.display = option.classList.contains(country) ? "block" : "none";
        });

        // Asegurarse de mantener la ciudad seleccionada solo si pertenece al país
        if (!cityFilter.querySelector(`option[class*="${country}"]:checked`)) {
            cityFilter.value = ""; // Resetear si no corresponde
        }
    };

    // Aplicar filtros al presionar el botón
    const applyFilters = () => {
        isFiltered = true; // Activar bandera de filtrado manual
        const queryParams = new URLSearchParams();
        if (countryFilter.value) queryParams.append("country", countryFilter.value);
        if (cityFilter.value) queryParams.append("city", cityFilter.value);
        if (categoryFilter.value) queryParams.append("category", categoryFilter.value);
        if (subcategoryFilter.value) queryParams.append("subcategory", subcategoryFilter.value);

        // Recargar la página con los parámetros en la URL
        window.location.search = queryParams.toString();
    };

    // Filtrar productos según los criterios
    const filterProducts = () => {
        const products = Array.from(carouselContainer.querySelectorAll(".product"));
        const urlParams = new URLSearchParams(window.location.search);
        const country = isFiltered ? countryFilter.value : urlParams.get("country");
        const city = isFiltered ? cityFilter.value : urlParams.get("city");
        const category = isFiltered ? categoryFilter.value : urlParams.get("category");
        const subcategory = isFiltered ? subcategoryFilter.value : urlParams.get("subcategory");

        let visibleCount = 0;

        products.forEach(product => {
            const matchesCountry = !country || product.classList.contains(country);
            const matchesCity = !city || product.classList.contains(city);
            const matchesCategory = !category || product.classList.contains(category);
            const matchesSubcategory = !subcategory || product.classList.contains(subcategory);

            const isVisible = matchesCountry && matchesCity && matchesCategory && matchesSubcategory;
            product.style.display = isVisible ? "block" : "none";

            if (isVisible) visibleCount++;
        });

        // Mostrar/ocultar mensaje de resultados vacíos
        noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";

        // Ajustar automáticamente el ancho del carrusel
        carouselContainer.style.gridTemplateColumns = visibleCount > 0
            ? `repeat(${Math.min(3, visibleCount)}, 1fr)`
            : "1fr"; // Si no hay productos, mostrar una columna vacía
    };

    // Ejecutar filtros al cargar la página
    window.onload = () => {
        initializeFiltersFromURL(); // Inicializar valores desde la URL
        filterProducts(); // Aplicar filtros a los productos
    };

    // Actualizar las opciones de ciudad al cambiar país
    countryFilter.addEventListener("change", () => updateCityOptions());

    // Aplicar filtros al hacer clic en Filtrar
    filterButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir comportamiento por defecto
        applyFilters(); // Recargar con nuevos parámetros
    });
});
