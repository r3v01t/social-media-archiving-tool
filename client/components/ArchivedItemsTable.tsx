import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Card,
  Title,
  Text,
} from "@tremor/react";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import useFetchOnChain from "@/hooks/useFetchOnChain";
import { getArchives } from "@/services/web3";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ArchivedItemsTable({ reload }) {
  const getShortHandAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 6,
      address.length
    )}`;
  };

  const getShortHandUrl = (url: string) => {
    return `${url.slice(0, 16)}...`;
  };

  function convertBigIntTimestampToDate(bigIntTimestamp: bigint) {
    const timestampInSeconds: number = Number(bigIntTimestamp);

    // Multiply by 1000 to convert seconds to milliseconds
    const timestampInMilliseconds: number = timestampInSeconds * 1000;

    // Create a Date object using the timestamp
    const date: Date = new Date(timestampInMilliseconds);

    return date.toDateString();
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    const func = async () => {
      const d = await getArchives();
      setData(d);
    };
    func();
  }, [reload]);

  if (data.length < 1) return <h1>No data</h1>;

  return (
    <Card>
      <Title>Your archived screenshots</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <Text color="blue">Content Hash</Text>
            </TableHeaderCell>
            <TableHeaderCell>
              <Text color="blue">Image</Text>
            </TableHeaderCell>
            {/* <TableHeaderCell>
              <Text color="blue">Tx Hash</Text>
            </TableHeaderCell> */}
            <TableHeaderCell>
              <Text color="blue">Timestamp</Text>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item["0"]}>
              <TableCell>
                <Link href={item["0"]} target="_blank">
                  {getShortHandAddress(item["0"])}
                </Link>
              </TableCell>

              <TableCell>
                <Text>
                  <Link
                    href={item["2"]}
                    target="_blank"
                    className="transition-all duration-300 hover:text-tremor-brand"
                  >
                    {getShortHandUrl(item["2"])}
                  </Link>
                </Text>
              </TableCell>

              {/* <TableCell>
                <Text>
                  <Link
                    href={item["3"]}
                    target="_blank"
                    className="transition-all duration-300 hover:text-tremor-brand"
                  >
                    {getShortHandUrl(item["3"])}
                  </Link>
                </Text>
              </TableCell> */}

              <TableCell>
                <Text>{convertBigIntTimestampToDate(item["1"])}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
