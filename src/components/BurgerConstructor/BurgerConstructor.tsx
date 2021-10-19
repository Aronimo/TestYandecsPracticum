import { useState } from 'react';
import { DragIcon, ConstructorElement, CheckMarkIcon } from '../../index';
import style from './BurgerConstructor.module.css'
import { Button, CurrencyIcon,  } from '../../index';
import Modal from '../Popup/Popup';


interface NewFunction  {
    condition: string,
    data: any,
    DataConstructor: any,
    DelFunction: any
}



export const AppBurgerConstructor = (props: {
    condition: string,
    data: any,
    DataConstructor: any,
    DelFunction: any}) => {
    
    //не хочет заводится не правильное использование
    const [value, setValue] = useState(false);

    console.log(props.data);
        
        //если выбрано булок > 1 возьмем только 1;
        let bun: { _id: string } = {
            "_id": "-1"
        };
        let sum=0;
    props.DataConstructor.forEach((i: { id: string; }) => {
        let serch = props.data.find((f: { _id: string; type: string; }) => (f._id === i.id && f.type === "bun"));
            if (serch) {
                bun = serch;
                sum = serch.price;
            }
        })
        var renderconstructor: { item: any; count: number; }[] = []

    props.DataConstructor.sort(function (a: { sort: number; }, b: { sort: number; }) {
            if (a.sort > b.sort) return 1;
            if (a.sort < b.sort) return -1;
            // a должно быть равным b
            return 0;})
            .forEach((i: { id: string, count: number; }) => {

            if (i.id !== bun._id) {
                let itemf = props.data.find((f: { _id: string; }) => f._id == i.id)
                if (typeof (itemf) !== "undefined") {
                    renderconstructor.push({ item: itemf, count: i.count });
                    sum += itemf.price;
                }
            }
        })

    const renderDetail = () => {
        console.log('dsfdfsdf')
        return (
            
            <div className={style.PopupDetail}>
                <div className={style.NumerOrder}><label>555668</label></div>
                <div className={style.NumerOrderTitle}><label>Индетификатор зака</label></div>
                <div className={style.CheckMarkIconPopupDetail}><img src="/done.png" /></div>
                <div className={style.Text1}><label>Ваш заказ начали готовить</label></div>
                <div className={style.Text2}><label>Дождитесь готовности на орбитальной станции</label></div>
            </div>
        )
    }
       
        return (
            
            <div style={{ display: 'contents' }}>
                {value && <Modal visible={true} handleClose={() => setValue(false)} > {renderDetail()}</Modal>}
                <div style={{ height: '100px' }}  />
                <div className={style.ListIngredient}>
                    {bun._id !== "-1" && <Constructor item={bun} condition={props.condition} type="top" />}
                    {
                        renderconstructor.map((item: any) => (
                            <Constructor item={item.item} condition={props.condition} type="undefined" />))
                    }
                    {bun._id !== "-1" && <Constructor item={bun} condition={props.condition} type="bottom" />}
                </div>
                <div className={style.Checkout}>
                    <div>
                        <label>{sum}</label>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large" onClick={() => setValue(true)} >
                       Оформить заказ
                    </Button>
                </div>
                <div style={{ height: '92px'}}></div>
            </div>
        )
    };


const Constructor = (props: { item: any, condition: any, type: any }) => {
    {
        let locked = props.type != "undefined"
        console.log(props.item.image_large)
        return (
            <div className={style.Constructor}>
                {!locked && <DragIcon type={props.condition} />}
                <ConstructorElement
                    type={props.type}
                    isLocked={locked}
                    text={props.item.name}
                    price={(props.item.price)}
                    thumbnail={props.item.image_large}
                />
            </div>
        )
    }
    ;
}
