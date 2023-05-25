// Converts hex color strings to RGB color strings
export const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// Converts RGB color to HSL color strings
export const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min){
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s *= 100;
    s = Math.round(s);
    l *= 100;
    l = Math.round(l);
    h = Math.round(360*h);

    // Adjust the saturation and lightness to make the color pastel
    return `hsl(${h}, ${Math.max(s - 50, 40)}%, ${90}%)`;
};

export const darkenColor = (color, saturate, darken) => {
    const hslRegex = /^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/;
    const [, hue, saturation, lightness] = color.match(hslRegex);
    const newLightness = Math.max(Number(lightness) - darken, 0);
    const newSaturation = Math.min(Number(saturation) + saturate, 100);
    const newColor = `hsl(${hue}, ${newSaturation}%, ${newLightness}%)`;  
    return newColor;
};