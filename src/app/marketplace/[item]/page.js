import { db } from "@/utils/dbConnections";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function ItemPage({ params }) {
    const { item } = await params;
    const query = await db.query(`SELECT * FROM uni_posts WHERE id = $1`, [item]);
    const data = query.rows;
    // console.log(data);
    return (
        <>
            <h2>Item Page</h2>
            <div>
                {data.map((marketItem) => {
                    return (
                        <div key={marketItem.id} href={`/marketplace/${marketItem.id}`}>
                            <article>
                                <Image
                                    src={marketItem.image}
                                    alt={marketItem.post}
                                    width={1000}
                                    height={1000}
                                />
                                <p>{marketItem.post}</p>
                                <p>{marketItem.category}</p>
                                <p>{marketItem.created_at.toLocaleString()}</p>
                                <Link className="button" href={`/marketplace`}>return</Link>
                            </article>
                        </div>
                    );
                })}
            </div>
        </>
    );
}