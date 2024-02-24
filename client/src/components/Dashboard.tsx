import { RiArrowRightUpLine } from "@remixicon/react";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useQuery, gql } from "@apollo/client";
import { useAccount } from "wagmi";
import { ArchiveItem } from "../types/query.types";

const ARCHIVED_ITEMS_QUREY = gql`
  query ArchivedItems($userAddress: String!) {
    archiveCreateds(where: { user: $userAddress }) {
      id
      user
      webpageUrl
      timestamp
      ipAddress
      transactionHash
    }
  }
`;

export default function Dashboard() {
  const account = useAccount();

  const { data: queryData, loading } = useQuery(ARCHIVED_ITEMS_QUREY, {
    variables: { userAddress: account.address },
  });

  const parseWebPageUrl = (url: string, truncate: boolean = false) => {
    const parsedUrl = atob(url.split(".png")[0]);
    if (!truncate) return parsedUrl;

    return parsedUrl.length > 55 ? parsedUrl.slice(0, 55) + "..." : parsedUrl;
  };

  const formatTimestamp = (timestamp: string): string => {
    const timestampInNumber = parseInt(timestamp);
    const date = new Date(timestampInNumber);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  if (loading) {
    return (
      <Card className="mt-20">
        <Table>
          <TableBody>
            <TableRow className="animate-pulse">
              <TableCell className="h-20 bg-slate-600"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  }

  if (!queryData || queryData.archiveCreateds.length === 0) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center">
        <h3 className="text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          You have no archives yet
        </h3>
      </div>
    );
  }

  return (
    <Card className="mt-20">
      <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        List of Your Archives
      </h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Timestamp</TableHeaderCell>
            <TableHeaderCell>Webpage URL</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {queryData.archiveCreateds.map((item: ArchiveItem) => (
            <TableRow key={item.id}>
              <TableCell>{formatTimestamp(item.timestamp)}</TableCell>
              <TableCell className="cursor-pointer transition-all duration-300 ease-in-out hover:text-[#0284C7] hover:underline">
                <a href={parseWebPageUrl(item.webpageUrl)} target="_blank">
                  {parseWebPageUrl(item.webpageUrl, true)}
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={`https://sepolia.explorer.zksync.io/tx/${item.transactionHash}`}
                  target="_blank"
                >
                  <Badge
                    color="sky"
                    icon={RiArrowRightUpLine}
                    className="cursor-pointer"
                  >
                    See transaction details
                  </Badge>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
