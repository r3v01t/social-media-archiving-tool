import { RiArrowRightUpLine } from "@remixicon/react";
import {
  Badge,
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
import { ethers } from "ethers";

const ARCHIVED_ITEMS_QUREY = gql`
  query ArchivedItems($userAddress: String!) {
    archiveCreateds(where: { user: $userAddress }) {
      id
      user
      webpageUrl
      timestamp
      ipAddress
      transactionHash
      pHash
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

  const parseIpAddress = (ipAddress: string) => {
    return ethers.utils.parseBytes32String(ipAddress);
  };

  const parsePHash = (pHash: string) => {
    return ethers.utils.parseBytes32String(pHash);
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
      <div className="w-full h-full flex items-center justify-center text-3xl mt-20 text-gray-300 animate-pulse duration-300 ease-in-out">
        Loading...
      </div>
    );
  }

  if (!queryData || queryData.archiveCreateds.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h3 className="text-2xl font-semibold text-dark-tremor-content-emphasis">
          You have no archives yet
        </h3>
      </div>
    );
  }

  return (
    <div className="mt-20 overflow-auto !bg-transparent mx-auto">
      <h3 className="font-semibold mb-8 text-gray-200 text-center">
        List of Your Archives
      </h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-dark-tremor-content-emphasis">
              Timestamp
            </TableHeaderCell>
            <TableHeaderCell className="text-dark-tremor-content-emphasis">
              Webpage URL
            </TableHeaderCell>
            <TableHeaderCell className="text-dark-tremor-content-emphasis">
              IP Address
            </TableHeaderCell>
            <TableHeaderCell className="text-dark-tremor-content-emphasis">
              Hash
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {queryData.archiveCreateds.map((item: ArchiveItem) => (
            <TableRow key={item.id}>
              <TableCell className="text-gray-400">
                {formatTimestamp(item.timestamp)}
              </TableCell>
              <TableCell className="cursor-pointer text-dark-tremor-content-emphasis transition-all duration-300 ease-in-out hover:text-[#0284C7] hover:underline">
                <a href={parseWebPageUrl(item.webpageUrl)} target="_blank">
                  {parseWebPageUrl(item.webpageUrl, true)}
                </a>
              </TableCell>
              <TableCell className="text-gray-400">
                {parseIpAddress(item.ipAddress)}
              </TableCell>
              <TableCell className="text-gray-400">
                {parsePHash(item.pHash)}
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
    </div>
  );
}
