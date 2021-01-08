<?php

namespace App\Repository;

use App\Entity\Show;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Show|null find($id, $lockMode = null, $lockVersion = null)
 * @method Show|null findOneBy(array $criteria, array $orderBy = null)
 * @method Show[]    findAll()
 * @method Show[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ShowRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Show::class);
    }

    public function findAllNextPaginated($page, $size) {
        $toDay = new \DateTime('+1 day');
        $timeStamp = $toDay->getTimestamp()*1000;

        return $this->createQueryBuilder('s')
            ->andWhere('s.date > :time')
            ->groupBy('s.id')
            ->orderBy("s.date", 'ASC')
            ->setParameter('time', $timeStamp)
            ->setFirstResult($page  * $size)
            ->setMaxResults($size)
            ->getQuery()
            ->getResult();
    }

    public function findAllBeforePaginated($page, $size) {
        $toDay = new \DateTime('+1 day');
        $timeStamp = $toDay->getTimestamp()*1000;

        return $this->createQueryBuilder('s')
            ->andWhere('s.date < :time')
            ->groupBy('s.id')
            ->orderBy("s.date", 'ASC')
            ->setParameter('time', $timeStamp)
            ->setFirstResult($page  * $size)
            ->setMaxResults($size)
            ->getQuery()
            ->getResult();
    }

    public function getNextTotalCount() {
        $toDay = new \DateTime('+1 day');
        $timeStamp = $toDay->getTimestamp()*1000;
        return $this->createQueryBuilder('s')
            ->select('count(s.id)')
            ->andWhere('s.date > :time')
            ->setParameter('time', $timeStamp)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function getBeforeTotalCount() {
        $toDay = new \DateTime('+1 day');
        $timeStamp = $toDay->getTimestamp()*1000;
        return $this->createQueryBuilder('s')
            ->select('count(s.id)')
            ->andWhere('s.date < :time')
            ->setParameter('time', $timeStamp)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function findAllByBand($bandId) {
        $toDay = new \DateTime('+1 day');
        $timeStamp = $toDay->getTimestamp()*1000;

        return $this->createQueryBuilder('s')
            ->innerJoin("s.band", "b")
            ->andWhere('s.date > :time')
            ->andWhere("b.id = :bandId")
            ->setParameter('bandId', $bandId)
            ->setParameter('time', $timeStamp)
            ->getQuery()
            ->getResult();
    }

    // /**
    //  * @return Show[] Returns an array of Show objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Show
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
