import { db } from "@/utils/dbConnections";
import Link from "next/link";
import Image from "next/image";

export default async function MarketPlace() {
  const marketItems = await db.query(`SELECT * FROM uni_posts`);
  // const parsedMarketItems = marketItems.rows;
  // console.log(marketItems);

  return (
    <>
      <h2>Marketplace</h2>
      <div>
        {marketItems.rows.map((marketItem) => {
          return (
            <Link key={marketItem.id} href={`/marketplace/${marketItem.id}`}>
              <article>
                <Image
                  src={marketItem.image}
                  alt={marketItem.post}
                  width={256}
                  height={256}
                />
                <p>{marketItem.post}</p>
                <p>{marketItem.category}</p>
                <p>{marketItem.created_at.toLocaleString()}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </>
  );
}
