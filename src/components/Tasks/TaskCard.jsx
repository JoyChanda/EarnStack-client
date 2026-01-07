import PropTypes from 'prop-types';
import { Card, Button } from '../ui';

const TaskCard = ({ task }) => {
    const { title, image, description, coins, date, status, creatorName } = task;

    return (
        <Card variant="hover" className="flex flex-col h-full group">
            {/* Task Image */}
            <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
                <img 
                    src={image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    🪙 {coins} Coins
                </div>
                {status && (
                    <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {status}
                    </div>
                )}
            </div>

            {/* Task Content */}
            <div className="flex flex-col flex-1 space-y-3">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white line-clamp-1 group-hover:text-primary-500 transition-colors">
                    {title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 leading-relaxed flex-1">
                    {description || "No description provided for this micro-task. Click view details to learn more."}
                </p>

                {/* Meta Info */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px]">
                            {creatorName?.charAt(0) || "U"}
                        </div>
                        <span className="text-neutral-500 font-medium">{creatorName || "Anonymous"}</span>
                    </div>
                    <span className="text-neutral-400">
                        {date || "Oct 24, 2023"}
                    </span>
                </div>

                {/* Action */}
                <Button variant="outline" className="w-full group-hover:bg-primary-500 group-hover:text-white transition-all">
                    View Details
                </Button>
            </div>
        </Card>
    );
};

TaskCard.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        description: PropTypes.string,
        coins: PropTypes.number,
        date: PropTypes.string,
        status: PropTypes.string,
        creatorName: PropTypes.string
    }).isRequired
};

export default TaskCard;
