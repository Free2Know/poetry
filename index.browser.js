// index.browser.js
export async function getPoets() {
    const response = await fetch('http://localhost:3000/api/poets');
    if (!response.ok) throw new Error(`Network response was not ok ${response.statusText}`);
    return await response.json();
}

export async function getPoems() {
    const response = await fetch('http://localhost:3000/api/poems');
    if (!response.ok) throw new Error(`Network response was not ok ${response.statusText}`);
    return await response.json();
}

export async function getPoemsByPoet(poetName) {
    const response = await fetch(`http://localhost:3000/api/poems/${poetName}`);
    if (!response.ok) throw new Error(`Network response was not ok ${response.statusText}`);
    return await response.json();
}