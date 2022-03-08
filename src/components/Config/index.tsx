import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from "primereact/button";

export const AppConfig = (props: any) => {

    const [active, setActive] = useState(false);
    const [scale, setScale] = useState(16);
    const [scales] = useState([12,13,14,15,16]);
    const [themeScheme, setThemeScheme] = useState('saga');
    const [themeColor, setThemeColor] = useState('blue');
    const config = useRef(null);
    let outsideClickListener = useRef(null);

}
