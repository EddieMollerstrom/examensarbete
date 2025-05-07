
const setObject1 = {
    kg: "101",
    reps: "1",
    date: "2025-05-07"
}

const setObject2 = {
    kg: "102",
    reps: "2",
    date: "2025-05-07"
}

const setObject3 = {
    kg: "103",
    reps: "3",
    date: "2025-05-07"
}

const list = [setObject1, setObject2, setObject3];

export default function Set() {
    return <>
        <div>
            {list.map((item, index) => (
                <div key={index} className="p-2 border rounded">
                    <p><strong>Vikt:</strong> {item.kg} kg</p>
                    <p><strong>Reps:</strong> {item.reps}</p>
                    <p><strong>Datum:</strong> {item.date}</p>
                </div>
            ))}
        </div>
    </>
}