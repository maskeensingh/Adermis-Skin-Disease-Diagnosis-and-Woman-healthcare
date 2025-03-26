import Link from 'next/link';

interface ScanHistoryItem {
  id: number;
  date: string;
  condition: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  imageUrl: string;
}

interface HistoryCardProps {
  scan: ScanHistoryItem;
}

export default function HistoryCard({ scan }: HistoryCardProps) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <Link href={`/dashboard/history/${scan.id}`} className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                <img src={scan.imageUrl} alt={scan.condition} className="h-12 w-12 object-cover" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-indigo-600 truncate">{scan.condition}</p>
                <p className="text-sm text-gray-500">
                  {new Date(scan.date).toLocaleDateString()} · Confidence: {scan.confidence}%
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  scan.severity === 'High'
                    ? 'bg-red-100 text-red-800'
                    : scan.severity === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {scan.severity}
              </span>
              <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}