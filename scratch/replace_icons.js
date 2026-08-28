const fs = require('fs');
const path = require('path');

const iconMap = {
  ArrowDownOutlined: 'ArrowDownIcon',
  ArrowLeftOutlined: 'ArrowLeftIcon',
  ArrowRightOutlined: 'ArrowRightIcon',
  ArrowUpOutlined: 'ArrowUpIcon',
  CheckOutlined: 'CheckIcon',
  CloseCircleOutlined: 'XCircleIcon',
  CloseOutlined: 'XMarkIcon',
  CreditCardOutlined: 'CreditCardIcon',
  DeleteOutlined: 'TrashIcon',
  EditOutlined: 'PencilIcon',
  EllipsisOutlined: 'EllipsisHorizontalIcon',
  EyeOutlined: 'EyeIcon',
  FilePdfOutlined: 'DocumentIcon',
  FileTextOutlined: 'DocumentTextIcon',
  LoadingOutlined: 'ArrowPathIcon',
  LockOutlined: 'LockClosedIcon',
  LogoutOutlined: 'ArrowRightOnRectangleIcon',
  MailOutlined: 'EnvelopeIcon',
  MenuOutlined: 'Bars3Icon',
  MinusCircleOutlined: 'MinusCircleIcon',
  PlusOutlined: 'PlusIcon',
  RocketOutlined: 'RocketLaunchIcon',
  SaveOutlined: 'CheckIcon',
  SearchOutlined: 'MagnifyingGlassIcon',
  UploadOutlined: 'ArrowUpTrayIcon',
  UserOutlined: 'UserIcon',
  BankOutlined: 'BuildingLibraryIcon',
  CustomerServiceOutlined: 'PhoneIcon',
  DashboardOutlined: 'Squares2X2Icon',
  DesktopOutlined: 'ComputerDesktopIcon',
  DollarOutlined: 'CurrencyDollarIcon',
  ExportOutlined: 'ArrowTopRightOnSquareIcon',
  FileImageOutlined: 'PhotoIcon',
  FileSyncOutlined: 'ArrowPathRoundedSquareIcon',
  RedoOutlined: 'ArrowPathIcon',
  RetweetOutlined: 'ArrowsRightLeftIcon',
  SettingOutlined: 'Cog6ToothIcon',
  TeamOutlined: 'UsersIcon',
  TrophyOutlined: 'TrophyIcon',
  SyncOutlined: 'ArrowPathIcon',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find if it has @ant-design/icons import
  if (!content.includes('@ant-design/icons')) return;

  // Extract all imported icons from the block
  // This regex handles multi-line imports like import { \n A, \n B } from '@ant-design/icons';
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@ant-design\/icons['"];?/g;
  
  let newContent = content;
  let match;
  let iconsToImport = new Set();
  
  while ((match = importRegex.exec(content)) !== null) {
    const importedIcons = match[1].split(',').map(s => s.trim()).filter(Boolean);
    
    for (const antdIcon of importedIcons) {
      if (iconMap[antdIcon]) {
        iconsToImport.add(iconMap[antdIcon]);
        // Replace all usages of the component
        const usageRegex = new RegExp(`<${antdIcon}(\\s|\\/|>)`, 'g');
        newContent = newContent.replace(usageRegex, `<Icon component={${iconMap[antdIcon]}}$1`);
      } else {
        console.warn(`WARNING: No map for ${antdIcon} in ${filePath}`);
      }
    }
  }

  // Remove the old import block completely
  newContent = newContent.replace(importRegex, '');

  if (iconsToImport.size > 0) {
    // Add Icon wrapper and Heroicons import
    const heroiconsImport = `import { ${Array.from(iconsToImport).join(', ')} } from '@heroicons/react/24/outline';\nimport Icon from '@/components/Icon';\n`;
    
    // Find last import and insert after it, or insert at top
    const lastImportIndex = newContent.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLastImport = newContent.indexOf('\n', lastImportIndex) + 1;
      newContent = newContent.slice(0, endOfLastImport) + heroiconsImport + newContent.slice(endOfLastImport);
    } else {
      newContent = heroiconsImport + newContent;
    }
  }

  fs.writeFileSync(filePath, newContent);
  console.log(`Processed ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, '../frontend/src'));
