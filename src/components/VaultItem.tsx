import React, { useState } from 'react';
import { Lock, Unlock, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { VaultItem as VaultItemType } from '../types';
import { formatDate } from '../utils';

interface Props {
  item: VaultItemType;
  onToggleLock: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<VaultItemType>) => void;
}

export const VaultItem: React.FC<Props> = ({
  item,
  onToggleLock,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editContent, setEditContent] = useState(item.content);
  const [editImage, setEditImage] = useState(item.image || '');

  const handleSave = () => {
    onUpdate(item.id, { title: editTitle, content: editContent, image: editImage });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4 transition-all hover:shadow-lg"
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <input
            type="url"
            value={editImage}
            onChange={(e) => setEditImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              <Save size={16} className="mr-1" /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onToggleLock(item.id)}
                className="p-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {item.isLocked ? <Lock size={18} /> : <Unlock size={18} />}
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          {item.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            </div>
          )}
          <p className="text-gray-600 mb-4">{item.content}</p>
          <div className="text-sm text-gray-400">
            <p>Created: {formatDate(item.createdAt)}</p>
            <p>Updated: {formatDate(item.updatedAt)}</p>
          </div>
        </>
      )}
    </motion.div>
  );
};