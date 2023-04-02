import React, { FC, useState } from 'react';

export type MyButtonProps = Readonly<{
    children?: React.ReactNode;
}>;

export const MyButton: FC<MyButtonProps> = (props) => {
    const [count, setCount] = useState(0);

    return (
        <div
            onClick={() => {
                setCount(v => v + 1);
            }}
            style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#475569',
                padding: '10px',
                cursor: 'pointer',
                borderRadius: '10px',
                userSelect: 'none',
            }}
        >
            MyButton {count}
        </div>
    );
};