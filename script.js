// NASA API Key
const apiKey = 'DEMO_KEY'; // Replace with your NASA API key

// Significant dates in the Mars Rover mission
const significantDates = [
    { earthDate: '2015-06-03', description: 'Photos from June 3, 2015' },
    { earthDate: '2019-09-02', description: 'Photos from September 2, 2019' },
    // Add more significant dates as needed
];

// Fetch Mars Rover photos for a given Earth date
async function fetchMarsPhotos(earthDate) {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${apiKey}`;
    console.log('Fetching photos from:', url); // Log the URL
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch photos');
        const data = await response.json();
        console.log('API Response:', data); // Log the response
        return data.photos;
    } catch (error) {
        console.error('Error fetching photos:', error);
        return [];
    }
}

// Display photos in the gallery with descriptions
function displayPhotos(photos, description) {
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = ''; // Clear previous photos

    if (photos.length === 0) {
        gallery.innerHTML = `<p>No photos available for this date.</p>`;
        return;
    }

    console.log('Displaying Photos:', photos); // Log the photos

    // Add main description at the top
    const mainDescription = document.createElement('p');
    mainDescription.className = 'main-description';
    mainDescription.textContent = description;
    gallery.appendChild(mainDescription);

    // Display photos
    photos.slice(0, 3).forEach(photo => {
        const photoContainer = document.createElement('div');
        photoContainer.className = 'photo-container';

        // Add image
        const img = document.createElement('img');
        img.src = photo.img_src;
        img.alt = `Mars photo taken on ${photo.earth_date} by ${photo.camera.full_name}`;
        photoContainer.appendChild(img);

        // Add individual photo description
        const photoDescription = document.createElement('p');
        photoDescription.className = 'photo-description';
        photoDescription.textContent = `Taken on ${photo.earth_date} by ${photo.camera.full_name}`;
        photoContainer.appendChild(photoDescription);

        gallery.appendChild(photoContainer);
    });

    // Add description underneath all pictures
    const footerDescription = document.createElement('p');
    footerDescription.className = 'footer-description';
    footerDescription.textContent = `These photos were taken by the Curiosity rover on ${photos[0].earth_date}.`;
    gallery.appendChild(footerDescription);
}

// Load photos for a user-selected Earth date
document.getElementById('load-photos').addEventListener('click', async () => {
    const earthDate = document.getElementById('date-input').value;
    if (!earthDate) {
        alert('Please select a date.');
        return;
    }
    console.log('Selected Date:', earthDate); // Log the selected date
    const photos = await fetchMarsPhotos(earthDate);
    displayPhotos(photos, `Photos from ${earthDate}`);
});

// Display photos for a significant Earth date on page load
async function displaySignificantDatePhotos() {
    const { earthDate, description } = significantDates[0]; // Use the first significant date
    console.log('Loading significant date photos for:', earthDate); // Log the significant date
    const photos = await fetchMarsPhotos(earthDate);
    displayPhotos(photos, description);
}

// Initialize the app
displaySignificantDatePhotos();