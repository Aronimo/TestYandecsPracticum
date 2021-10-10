import React from 'react';
import { Container } from 'react-bootstrap';
import { DragIcon, ConstructorElement } from '../../index';

type CardProps = {
    condition: string,
    data: any,
    DelFunction: any
}

export const AppBurgerConstructor = newFunction()

function newFunction() {
    return ({ data, DelFunction, condition }: CardProps) => {
        console.log(data);
        let itemss_not_bun = data.filter((f: { type: string, __v: number }) => f.type != "bun" && f.__v > 0);
        let bun = data.filter((f: { type: string; __v: number }) => f.type == "bun" )[0];
        console.log(itemss_not_bun);
        console.log(bun);
        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Constructor item={bun} condition={condition} type="top"/>
                    {
                        itemss_not_bun.map((item: any) => (<Constructor item={item} condition={condition} Delfunction={DelFunction} />))
                    }
                    <Constructor item={bun} condition={condition} type="bottom"/>
                </div>
            </>
        )
    }
        ;
}

const Constructor = (item: any, condition: any, type?: any, Delfunction?: any) => {
    {
        console.log(item)
        let visible = item == undefined;
        let locked = type != undefined;
        console.log(locked)
        return (
            <>
                {!locked && visible && <DragIcon type={condition} />}
                {visible && <ConstructorElement
                    type={locked ? undefined : type}
                    isLocked={locked}
                    text={item.name}
                    price={(item.price * item.__v)}
                    thumbnail={item.image_large}
                    handleClose={locked ? undefined : () => (Delfunction(item.id))}
                />}
            </>
        )
    }
    ;
}
